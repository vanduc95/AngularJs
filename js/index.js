/**
 * Created by vanduc on 11/11/2016.
 */
var app = angular.module('CalculatorApp', []);
app.controller('CalculatorController', function ($scope) {
    $scope.answer = '';
    /* the string display on screen*/

    var decimalAdded = false;
    /*When user click button '.' then var 'decimalAdded' = true*/
    var newSession = false;
    /*Is a new session.
     When user click button '=' and return success result then var 'newSession' = true*/

    var operators = ['+', '-', 'x', '÷'];


    /*
     *The method handle event when user click on keypad
     *var entry: a string represent each of button in keypad
     */
    $scope.handleClick = function (entry) {

        // click button 'AC'
        if (entry === 'ac') {
            $scope.answer = '';
            decimalAdded = false;
        }

        // click button 'CE'
        else if (entry === 'ce') {
            if ($scope.answer === 'Digit limit!' || $scope.answer === 'Error Syntax!') {
                $scope.answer = ''
            } else {
                $scope.answer = $scope.answer.slice(0, -1);
            }
            decimalAdded = false;
        }

        // click one of the buttons '+', '-', 'x', '÷'
        else if (operators.indexOf(entry) !== -1) {
            var lastChar = $scope.answer[$scope.answer.length - 1];

            // only add operator if output is not empty and there is no operator at the last
            if ($scope.answer !== '' && operators.indexOf(lastChar) === -1) {
                $scope.answer += entry;
            }

            // allow minus if the string is empty
            else if ($scope.answer === '' && entry === '-') {
                $scope.answer += entry;
            }

            // replace the last operator (if exists) by new operator when user click another button
            else if ($scope.answer.length > 1 && operators.indexOf(lastChar) !== -1) {
                $scope.answer = $scope.answer.replace(/.$/, entry);
            }
            decimalAdded = false;
            newSession = false;
        }

        // click button '='
        else if (entry === '=') {
            var equation = $scope.answer + '';

            // replace all instances of x and ÷ with * and / respectively.
            equation = equation.split('x').join('*');
            equation = equation.split('÷').join('/');

            // Calculating.
            // If the result is longer than 13 characters, rounding to 13 characters
            if (equation !== '') {
                try {
                    if (eval(equation).toString().length > 13) {
                        $scope.answer = eval(equation).toString().slice(0, 13);
                    } else {
                        $scope.answer = eval(equation);
                    }
                }
                catch (err) {
                    $scope.answer = 'Error Syntax!'
                }
            }

            decimalAdded = false;
            newSession = true;
        }

        // click button '.'
        else if (entry === '.') {
            if (!decimalAdded) {
                $scope.answer += entry;
                decimalAdded = true;
                newSession = false;
            }
        }

        // click buttons 0-->9
        else {
            if (newSession === false) {
                $scope.answer += entry;
            } else {
                $scope.answer = entry;
                newSession = false;
            }
        }

        // check if length string display on screen greater 13 then notify "Digit limit!'
        if ($scope.answer.length > 13) {
            $scope.answer = 'Digit limit!';
            decimalAdded = false;
            newSession = true;
        }
    };
});