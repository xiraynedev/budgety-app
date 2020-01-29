// Global App Controller

var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMStrings();

    document
      .querySelector(DOM.inputButton)
      .addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13) {
        ctrlAddItem();
      }
    });

    document
      .querySelector(DOM.container)
      .addEventListener('click', ctrlDeleteItem);

    document
      .querySelector(DOM.inputType)
      .addEventListener('change', UICtrl.changedType) ;
  };

  var updateBudget = function() {
    // 1. Calculate budget
    budgetCtrl.calculateBudget();

    // 2. Return budget
    var budget = budgetCtrl.getBudget();

    // 3. Display budget on UI
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function() {
    // 1. Calc percentages
    budgetCtrl.calculatePercentages();

    // 2. Read them from budget control
    var percentages = budgetCtrl.getPercentages();

    // 3. Update UI with new percentages
    UICtrl.displayPercentages(percentages);
  };

  var ctrlAddItem = function() {
    var input, newItem;

    // 1. Get input data
    input = UICtrl.getInput();
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to UI
      UICtrl.addListItem(newItem, input.type);

      // 4. Clear fields
      UICtrl.clearFields();

      // 5. Calc budget
      updateBudget();

      // 6. Calc and update percentages
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(e) {
    var itemID, splitID, type, ID;

    itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);
    }

    // 1. Delete item from data structure
    budgetCtrl.deleteItem(type, ID);

    // 2. Delete item from UI
    UICtrl.deleteListItem(itemID);

    // 3. Update and show new budget
    updateBudget();

    // 4. Calculate and update percentages
    updatePercentages();
  };

  return {
    init: function() {
      console.log('app has started');
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });

      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
