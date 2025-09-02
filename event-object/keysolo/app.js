class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.secondsElement = container.querySelector('.status__seconds');
    
    this.languageElement = container.querySelector('.status__language');
    this.language = "🇺🇸"
    this.languageElement.textContent = '?';

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener("keydown", (event) => {
        if(event.key == "Shift" && event.altKey || event.key == "Alt" && event.shiftKey) {
            this.changeLanguage()
            return;
        } else if (event.key === "Shift" || event.key === "Alt") {
            return;
        }
        this.changeLanguage(event.key);
        if(event.key.toLowerCase() === this.currentSymbol.textContent.toLowerCase()) 
            this.success();
        else
            this.fail();
    });
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
    this.renderTimer(word.length);
  }

  getWord() {
    const words = [
        'apple', 'banana', 'computer', 'development', 'education',
        'family', 'garden', 'history', 'internet', 'journey',
        'kitchen', 'language', 'music', 'nature', 'orange',
        'people', 'question', 'river', 'school', 'travel',
        'universe', 'victory', 'water', 'xylophone', 'yellow',
        'zebra', 'animal', 'book', 'cloud', 'dance',
        'energy', 'flower', 'green', 'house', 'island',
        'jacket', 'king', 'lemon', 'mountain', 'night',
        'ocean', 'pencil', 'quiet', 'rainbow', 'sun',
        'tree', 'umbrella', 'voice', 'window', 'yoga',
        
        'дом', 'солнце', 'река', 'город', 'школа',
        'книга', 'друг', 'семья', 'работа', 'улица',
        'время', 'год', 'день', 'ночь', 'рука',
        'нога', 'голова', 'вода', 'огонь', 'земля',
        'воздух', 'цветок', 'дерево', 'кошка', 'собака',
        'стол', 'стул', 'окно', 'дверь', 'компьютер',
        'телефон', 'музыка', 'фильм', 'еда', 'наука',
        'искусство', 'спорт', 'здоровье', 'путешествие', 'мечта',
        'счастье', 'любовь', 'дружба', 'знание', 'погода',
        'зима', 'весна', 'лето', 'осень', 'праздник',
        
        'to сделать', 'сдать homework', 'and так',
        'так what', 'далее later', 'code ручка', 'программа killer', 'develop проблемки',
        'web разработка', 'web дизайн', 'сайт github', 'мобильное application', 'desktop приложение',
        'большие data', 'big данные', 'тупо base', 'this is база', 'i cloud',
        'apple облако', 'зарубежный server', 'сервер regru', 'випclient', 'vipклиент',
        'frontend разработка', 'бэкенд development', 'примитивный design'
    ];
    
    const index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;
    
    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }

  renderTimer(seconds) {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.secondsElement.textContent = seconds;

    this.timeout = setTimeout(() => this.fail(), seconds * 1000);
    this.interval = setInterval(() => --this.secondsElement.textContent, 1000);
  }
  
  changeLanguage(symb = null) {
    if(symb === null) {
        this.language = this.language === "ru" ? "en" : "ru";
    } else if(symb.toLowerCase() >= 'а' && symb.toLowerCase() <= 'я') {
        this.language = "ru";
    } else if(symb.length === 1 && symb != " ") {
        this.language = "en";
    }
    this.languageElement.textContent = this.language === "ru" ? "🇷🇺" : "🇺🇸";
  }
}

const game = new Game(document.getElementById('game'));