document.addEventListener('DOMContentLoaded', () => {
    // Referenciando os elemetos do APP
    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const resultContainer = document.getElementById('result');
    const progressContainer = document.getElementById('progress');
    const currentScoreDisplay = document.getElementById('currentScore');
    const highScoreDisplay = document.getElementById('highScore');
    const gameSetupDiv = document.getElementById('game-setup');
    const quizDiv = document.getElementById('quiz');
    const categorySelect = document.getElementById('category');
    const amountInput = document.getElementById('amount');
    const difficultySelect = document.getElementById('difficulty');
    const startButton = document.getElementById('start-btn');

    // variaveis dinamicas do APP
    let highScore = parseInt(localStorage.getItem('HighScoreTrivia')) || 0;
    const baseScoreQuestion = 1000;
    const penaltyPerSecond = 10;
    let currentQuestions = [];
    let questionStartTime;
    let questionIndex = 0;
    let score = 0;

    // inserindo o valor da maior pontuação 
    highScoreDisplay.innerText = `High Score ${highScore}`

    // função de requisição de categoria
    // se não funcionar ajeitar o local do 1° then
    function fetchCategories(){
        fetch('https://opentdb.com/api_category.php')
        .then(response => response.json())
        .then(data => {data.trivia_categories.forEach(category =>{
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild('option');          
        });});
    };
    
    // função para iniciar o APP
    function startGame(){
        const difficulty = difficultySelect.value;
        const category = categorySelect.value;
        const amount = amountInput.value;
        fetchQuestions(difficulty, category, amount);
        gameSetupDiv.style.display = 'none';
        quizDiv.style.display = 'block';

    }
    // função para requesição dos dados das questões
    function fetchQuestions(difficulty, category, amount){
        let url = `https://opentdb.com/api_category.php?amount=${amount}`;
        if(difficulty) url += `&difficulty=${difficulty}`;
        if(category) url += `&category=${category}`;
        url += `&type=multiple`;

        fetch(url).then(response => response.json())
        .then(data => {
            currentQuestions = data.results;
            questionIndex = 0;
            score = 0;

            displayQuestion();
        }).catch(error => alert('Error:'+error));
    }
    // 
    function displayQuestion(){
        if(questionIndex < currentQuestions.length){
            let currentQuestion = currentQuestions[questionIndex];
            questionContainer.innerHTML = decodeHTML(currentQuestion.question);
            displayAnswers(currentQuestion);
            updateProgress();
            questionStartTime = Date.now();
        }else{
            updateHighScore();
            showResults();
        }
    }
})