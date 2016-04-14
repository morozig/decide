var log = require('single-line-log').stdout;
var chalk = require('chalk');
var cursor = require('ansi')(process.stdout);

var width = process.stdout.columns;

var turn = () => Math.random() >= 0.5 ? 1 : -1;

module.exports = (player1, player2) => {
    var progressLength = width - player1.length - player2.length - 5;
	var maxCount = 20;
	var delay = 200;
	var count = 0;
    var turns = 0;
    var part = 0;
    cursor.hide();
	var counter = () => {
        count += turn();
        turns++;
        part = (count + maxCount) / maxCount / 2;
        var count1 = Math.floor(progressLength * part);
        var count2 = progressLength - count1;
        if (part <= 0){
            count1 = 0;
            count2 = progressLength;
        } else if (part >= 1){
            count1 = progressLength;
            count2 = 0;
        }
        var logString = ''.concat(
            chalk.cyan(player1),
            ' |',
            chalk.cyan('/'.repeat(count1)),
            chalk.red('\\'.repeat(count2)),
            '| ',
            chalk.red(player2)
        );
        log(logString);
        if (turns > 10 ){
            delay *= 0.9;
            turns = 0;
        }
        if (count > maxCount || count < -maxCount){
            var winner = count < -maxCount ? player2 : player1;
            log(logString);
		    console.log();
		    console.log(winner, 'won');
            cursor.show();
        } else {
            setTimeout(counter, delay);
        }
	};
    counter();
};