const quotes = [
    {
        quote: 'I never dreamed of success, I worked for it.',
        author: '- Estee Lauder -'
    },
    {
        quote: 'Every moment is a fresh beginning.',
        author: '- T.S Eloit -'
    },
    {
        quote: `Oh, the things you can find, if you don't stay behind.`,
        author: '- Dr Seuss -'
    },
    {
        quote: 'All limitations are self-imposed.',
        author: '- Oliver Wendell Holmes -'
    },
    {
        quote: 'Problems are not stop signs, they are guidelines.',
        author: '– Robert H. Schiullern -'
    },
    {
        quote: 'Dream as if you’ll live forever, live as if you’ll die today.',
        author: '- James Dean -'
    },
    {
        quote: 'Yesterday you said tomorrow. Just do it.',
        author: '- Nike -'
    },
    {
        quote: 'Don’t you know your imperfections is a blessing?',
        author: '– Kendrick Lamar -'
    },
    {
        quote: 'Let the beauty of what you love be what you do.',
        author: '- Rumi -'
    },
    {
        quote: 'I have nothing to lose but something to gain.',
        author: '- Eminem -'
    },
    ];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");
const TodaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = TodaysQuote.quote;
author.innerText = TodaysQuote.author;

