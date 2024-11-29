
const gameArea = document.querySelector('.gameArea');
const gameOver = document.querySelector('.gameOver');
const points = document.querySelectorAll('.points div');
const helpShootBtn = document.querySelectorAll('.helpShoot');

const startBtn = document.querySelector('.startBtn');
const moreDamageBtn = document.querySelectorAll('.moreDamage');


const enemiesEmoji = ['🧌','🧟‍♀️','🥷️','🧛‍♂️️'];

let sumPoints = 0;
let scalp = 0
let enemyStartPositionArr = [10];
let enemyPositionArr = [-15];
let enemyHpArr = [100];

let newEnemyHp = 100;
let intervals = 0;
let hit = 10;


// if one of enemyPositionArr number is bigger than 85
const numStop = (num) => num >= 90;

// calculate death and scalp
function totalPoints() {
    sumPoints++;
    scalp++;
    points[0].innerHTML = `Scalp: ${scalp}`;
    points[1].innerHTML = `Dead enemy: ${sumPoints}`;
}

// Iron units
function ironUnits(){
    // iron fist & iron foot
    if (sumPoints >= 10){
        moreDamageBtn[0].onclick = () => {
            moreDamageBtn[0].classList.add('active');
        }
    }
    if (sumPoints >= 25){
        moreDamageBtn[1].onclick = () => {
            moreDamageBtn[1].classList.add('active');
        }
    }

    if(moreDamageBtn[0].classList.contains('active')){
        hit = 20;
    }
    if(moreDamageBtn[1].classList.contains('active')){
        if (rnd(100) < 25){
            hit = 100;
        }
    }
}

// random number
function rnd(num) {
    return Math.round(Math.random() * num)
}

// add enemy
function addEnemy(){
    enemyStartPositionArr.push(rnd(525))
    enemyPositionArr.push(-15)
    enemyHpArr.push(newEnemyHp)
    gameArea.innerHTML += `
                <div class="enemy">
                    <div class="enemyBtn">${enemiesEmoji[rnd(enemiesEmoji.length-1)]}</div>
                    <div class="hpTotal">
                        <div class="hp"></div>
                    </div>
                </div>
            `
}

// run game
function gameRun(){

    // ADD ENEMY
    intervals++
    if (enemyPositionArr.some(numStop) === false){
        if (intervals <= 100 && intervals % 5 === 0){
            addEnemy()
        }else if (intervals > 100 && intervals <= 250 && intervals % 4 === 0){
            addEnemy()
        } else if (intervals > 250 && intervals % 2 === 0){
            addEnemy()
        }
    }

    ironUnits()

    const rndHit = () => {
        return Math.round(Math.random() * hit)
    }

    const hp = document.querySelectorAll('.hp');
    const enemy = document.querySelectorAll('.enemy');
    const enemyBtn = document.querySelectorAll('.enemyBtn');

    enemy.forEach((x, i) => {
        if (enemyHpArr[i] <= 0 && !enemy[i].classList.contains('dead')){
            enemyHpArr[i] = 0;
            hp[i].style.width = enemyHpArr[i];
            enemyBtn[i].innerText = '☠️'
            enemyBtn[i].style.pointerEvents = 'none'
            enemy[i].classList.add('dead');
            totalPoints()
        }
        if (x.classList.contains('dead') && intervals % 5 === 0){
            x.style.display = 'none'
        }
    })

    // HELPING UNITS
    // dagger
        helpShootBtn[0].onclick = () => {
            if (scalp >= 1){
                scalp--;
                points[0].innerHTML = `Scalp: ${scalp}`;
                enemyHpArr.forEach((x,index) => {
                    if (x > 0){
                        enemyHpArr[index] -= rnd(10);
                        hp[index].style.width = enemyHpArr[index] + '%';
                    }else {
                        enemyHpArr[index]=0;
                        hp[index].style.width = 0 + '%';
                    }
                })
            }
        }
        // Axe
        helpShootBtn[1].onclick = () => {
            if (scalp >= 3){
                scalp-=3;
                points[0].innerHTML = `Scalp: ${scalp}`;
                enemyHpArr.forEach((x,index) => {
                    if (x > 0){
                        enemyHpArr[index] -= 30;
                        hp[index].style.width = enemyHpArr[index] + '%';
                    }else {
                        enemyHpArr[index]=0;
                        hp[index].style.width = 0 + '%';
                    }
                })
            }
        }
        // Bow
        helpShootBtn[2].onclick = () => {
            if (scalp >= 5){
                scalp-=5;
                points[0].innerHTML = `Scalp: ${scalp}`;
                helpShootBtn[2].classList.add('active');
            }
        }
        // Dynamite
        helpShootBtn[3].onclick = () => {
            if (scalp >= 10){
                scalp-=10;
                points[0].innerHTML = `Scalp: ${scalp}`;
                enemyHpArr.forEach((x,index) => {
                    if (x > 0){
                        enemyHpArr[index] =0;
                        hp[index].style.width = enemyHpArr[index] + '%';
                    }
                })
            }
        }
        // Nuclear bomb
        helpShootBtn[4].onclick = () => {
            if (scalp >= 10){
                scalp-=10;
                points[0].innerHTML = `Scalp: ${scalp}`;
                helpShootBtn[4].classList.add('active');
                newEnemyHp = 75;
            }
        }

    // game play
    if (enemyPositionArr.some(numStop) === false){
        // bow hit if active
        if (helpShootBtn[2].classList.contains('active')){
            enemyHpArr.forEach((x,index) => {
                if (x > 0){
                    enemyHpArr[index] -= rnd(10);
                    hp[index].style.width = enemyHpArr[index] + '%';
                }else {
                    enemyHpArr[index]=0;
                    hp[index].style.width = 0 + '%';
                }
            })
        }

        enemyBtn.forEach((btn, i) => {

            enemy[i].style.left = enemyStartPositionArr[i] + 'px';

            // enemy hit
            if (enemyPositionArr[i] <= 85) {
                btn.onclick = () => {
                    if (enemyHpArr[i] > 0) {
                        enemyHpArr[i] -= rndHit();
                        hp[i].style.width = enemyHpArr[i] + '%';
                    }else{
                        enemyHpArr[i] = 0;
                        hp[i].style.width = enemyHpArr[i];
                        enemyBtn[i].innerText = '☠️'
                        enemyBtn[i].style.pointerEvents = 'none'
                        totalPoints()
                        enemy[i].classList.add('dead');
                    }
                }
            }
            enemyMoves(i)
        })
    }else {
        gameOver.style.display = 'block';
        clearInterval()
    }

    // enemy move function
    function enemyMoves(i) {
        if (enemyHpArr[i] > 0) {
            enemyPositionArr[i] += 5;
            enemy[i].style.top = enemyPositionArr[i] + '%';
        }
    }

}

// start game
startBtn.onclick = () => {
    setInterval(gameRun,1000)
}