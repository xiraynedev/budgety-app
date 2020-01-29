
// UI CONTROLLER

var UIController = (function() {
    var DOMStrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputButton: '.add__btn',
      incomeContainer: '.income__list',
      expensesContainer: '.expenses__list',
      budgetLabel: '.budget__value',
      incomeLabel: '.budget__income--value',
      expensesLabel: '.budget__expenses--value',
      percentageLabel: '.budget__expenses--percentage',
      container: '.container',
      expensesPercLabel: '.item__percentage',
      dateLabel: '.budget__title--month'
    };

  var formatNumber = function (num, type) {
      var numSplit, int, dec, type;

      num = Math.abs(num);
      num = num.toFixed(2);

      numSplit = num.split('.');

      int = numSplit[0];
      if(int.length > 3) {
        int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);
      }

      dec = numSplit[1];

      return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    }

    var nodeListForEach = function(list, callback) {
      for (var i = 0; i < list.length; i++) {
        callback(list[i], i);
      }
    };
  
    return {
      getInput: function() {
        return {
          type: document.querySelector(DOMStrings.inputType).value, // inc or exp
          description: document.querySelector(DOMStrings.inputDescription).value,
          value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
        };
      },
  
      addListItem: function(obj, type) {
        // Create HTML string
        let html, element;
  
        if (type === 'inc') {
          element = DOMStrings.incomeContainer;
          html = `
          <div class="item clearfix" id="inc-${obj.id}">
          <div class="item__description">${obj.description}</div>
          <div class="right clearfix">
              <div class="item__value">${formatNumber(obj.value)}</div>
              <div class="item__delete">
                  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
              </div>
          </div>
          </div>
          `;
        } else if (type === 'exp') {
          element = DOMStrings.expensesContainer;
          html = `
          <div class="item clearfix" id="exp-${obj.id}">
          <div class="item__description">${obj.description}</div>
          <div class="right clearfix">
              <div class="item__value">${formatNumber(obj.value)}</div>
              <div class="item__percentage">21%</div>
              <div class="item__delete">
                  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
              </div>
          </div>
          </div>
          `;
        }
  
        // Insert HTML into DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', html);
      },
  
      deleteListItem: function(selectorID) {
        var el = document.getElementById(selectorID);
        el.parentNode.removeChild(el);
      },
  
      clearFields: function() {
        var fields, fieldsArr;
  
        fields = document.querySelectorAll(
          `${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`
        );
  
        fieldsArr = [...fields];
  
        fieldsArr.forEach(function(current, index, array) {
          current.value = '';
        });
  
        fieldsArr[0].focus();
      },
  
      displayBudget: function(obj) {
        var type;

        obj.budget > 0 ? type = 'inc' : type = 'exp';

        document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
        document.querySelector(DOMStrings.expensesLabel).textContent =
        formatNumber(obj.totalExp, 'exp');
  
        if (obj.percentage > 0) {
          document.querySelector(DOMStrings.percentageLabel).textContent =
            obj.percentage + '%';
        } else {
          document.querySelector(DOMStrings.percentageLabel).textContent = '--';
        }
      },
  
      displayPercentages: function(percentages) {
        var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);
  
        nodeListForEach(fields, function(current, index) {
  
          if (percentages[index] > 0) {
            current.textContent = percentages[index] + '%';
          } else {
            current.textContent = '--';
          }
  
        });
      },

      displayMonth: function() {
        var now, month, year;
        
        now = new Date();
        months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ];

        month = now.getMonth();
        year = now.getFullYear();
      

        document.querySelector(DOMStrings.dateLabel).textContent = months[0] + ' ' + year;

      },

      changedType: function() {
        var fields;

        fields = document.querySelectorAll(
          DOMStrings.inputType + ',' +
          DOMStrings.inputDescription + ',' +
          DOMStrings.inputValue,
        );

        nodeListForEach(fields, function(cur) {
          cur.classList.toggle('red-focus');
        });

        document.querySelector(DOMStrings.inputButton).classList.toggle('red');
      },
  
      getDOMStrings: function() {
        return DOMStrings;
      }
    };
  })();