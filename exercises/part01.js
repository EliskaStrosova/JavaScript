document.onreadystatechange = function () {
    if (document.readyState === 'complete') {

        let operations = {
            "÷": '/',
            "×": '*',
            "−": '-',
            "+": "+"
        };

        let toEvaluate = '';
        let toShow = document.getElementById('screen'); // oprava z 'getElementByCLass' na 'getElementById' , oprava ".screen" 
        let emp = false;

        // clear screen by default
        toShow.textContent = '0';          


        // print numbers to screen
        let numButtons = document.querySelectorAll('button.num');
        for (let i = 0; i < numButtons.length; i++) {
            numButtons[i].onclick = function() {
                if (emp) {
                    toEvaluate = '';
                }
                toEvaluate += this.textContent;
                toShow.textContent = toEvaluate;
                emp = false;
            };
        }
        
        // clear screen totally
        document.getElementById('clearall').onclick = function() { // oprava z 'clearalll' na 'clearall'
            toEvaluate = '';
            toShow.textContent = '0';
        };

        // clear last number on screen
        document.getElementById('clear').onclick = function() { // oprava z 'onClick' na 'onclick'
            toEvaluate = toEvaluate.slice(0, -1);
            toShow.textContent = toEvaluate || '0';
        };

        // change number sign
        document.getElementById('sign').onclick = function() {
            toEvaluate = Math.sign(parseFloat(toEvaluate)) === 1 ? '-' + toEvaluate : toEvaluate.slice(1); // přidána funkce parseFloat
            toShow.textContent = toEvaluate;
            emp = false;
        };

        // add operation sign
        let operationButtons = document.querySelectorAll('.operation');
        for (let i = 0; i < operationButtons.length; i++) { // opraveno z 'index' na 'i'
            operationButtons[i].onclick = function() {
                if (/[/*\-+]/.test(toEvaluate)) {
                    toEvaluate = eval(toEvaluate).toString();
                }
                if (toEvaluate.length > 0) {
                    toEvaluate += operations[this.textContent];
                    toShow.textContent = toEvaluate;
                }
                emp = false;
            };
        }

        // calculate what's on screen
        document.getElementById('equal').onclick = function() {
            toEvaluate = eval(toEvaluate).toString();
            toShow.textContent = toEvaluate === 'Infinity' ? 'BINGO!!!!' : toEvaluate;
            emp = true;
        };
    }
};
