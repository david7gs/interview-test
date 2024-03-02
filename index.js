const FAQ = [
    {
        q: "How much does Photoshop cost?",
        a: "Plans start at US$22.99/mo."
    },
    {
        q: "Can you use Photoshop to edit videos?",
        a: "Yes, you can use Photoshop to edit videos."
    },
    {
        q: "Is Photoshop available without a subscription?",
        a: "Photoshop is only available as part of a Creative Cloud plan, which includes the latest features, updates, fonts, and more."
    }
];

// add code here if needed

// adding viewport to <head> so media queries work correctly in chrome
const mTag      = document.createElement('meta');
mTag.name       = "viewport";
mTag.content    = "width=device-width, initial-scale=1";
document.getElementsByTagName('head')[0].appendChild(mTag);

function processBackgroundColor(el) {
    // add code here
    const bkground      = el.querySelector('p').textContent;
    const toRemove      = el.firstElementChild;
    el.style.background = bkground;
    toRemove.remove();
}
function processHero(el) {
    processBackgroundColor(el);
    // add code here
    const pList = Array.from (el.querySelectorAll('p'));
    pList.forEach((pTag, i) => {
        if (pTag.querySelector('a')) {
            let b       = pTag.querySelector('b').firstElementChild;
            let i       = pTag.querySelector('i').firstElementChild;
            pTag.classList.add('action-area');
            if (b) {
                b.classList.add('con-button');
                pTag.appendChild(b);
                pTag.querySelector('b').remove();
            }
            if (i) {
                i.classList.add('con-button', 'blue');
                pTag.appendChild(i);
                pTag.querySelector('i').remove();
            }
        }
    });
}
function processBrick(el) {
    processBackgroundColor(el);
    // add code here
    el.getElementsByTagName('p')[0].className = "title";
    el.getElementsByTagName('p')[1].className = "price";
    el.getElementsByTagName('p')[2].className = "description";
}
function processFaq() {
    //  improve this code
    //  Usually I would remove this commented out code but I left it in considering the comment above to improve it
    //
    //  el.innerHTML = `
    //     <div class="faq-set">
    //         <div class="question">
    //             <div>
    //                 <h3>${FAQ[0].q}</h3>
    //             </div>
    //         </div>
    //         <div class="answer">
    //             <div>
    //                 <p>${FAQ[0].a}</p>
    //             </div>
    //         </div>
    //     </div>
    //     <div class="faq-set">
    //         <div class="question">
    //             <div>
    //                 <h3>${FAQ[1].q}</h3>
    //             </div>
    //         </div>
    //         <div class="answer">
    //             <div>
    //                 <p>${FAQ[1].a}</p>
    //             </div>
    //         </div>
    //     </div>
    //     <div class="faq-set">
    //         <div class="question">
    //             <div>
    //                 <h3>${FAQ[2].q}</h3>
    //             </div>
    //         </div>
    //         <div class="answer">
    //             <div>
    //                 <p>${FAQ[2].a}</p>
    //             </div>
    //         </div>
    //     </div>`;

    let faqContainer    = '';
    const faqTarget     = document.querySelectorAll('.faq')[0];
    FAQ.forEach((element, index, array) => {
        const question  = element.q;
        const answer    = element.a;
        faqContainer += `
            <div class="faq-set">
                <div class="question">
                    <div>
                        <h3>${question}</h3>
                    </div>
                </div>
                <div class="answer">
                    <div>
                        <p>${answer}</p>
                    </div>
                </div>
            </div>`
    });
    faqTarget.innerHTML += faqContainer;

    const questions = document.querySelectorAll('.faq-set .question');
    const answers   = document.querySelectorAll('.faq-set .answer');
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const accordion         = question.nextElementSibling;
            const accordionSlider   = accordion.style.maxHeight;
            if (accordionSlider) {
                question.classList.remove("active");
                accordion.style.maxHeight = null
            } else {
                answers.forEach(answer =>
                    {   answer.style.maxHeight = null;
                        questions.forEach(q => {q.classList.remove("active")});
                        question.classList.add("active");
                        accordion.style.maxHeight = accordion.scrollHeight + "px"
                    });
            }
        });
    });
}
function processBanner(el) {
    // add code here
    const bannerBold = Array.from(el.querySelectorAll('b'));
    bannerBold.forEach((bold, i) => {
        if (bold.querySelector('a')) {
            let a = bold.querySelector('a');
            a.classList.add('con-button');
            el.appendChild(a);
            el.querySelector('b').remove();
        }
    });
    window.onscroll = function () {
        scrollFunction()
    };
    function scrollFunction() {
        const heroHeight = document.querySelectorAll('.hero')[0].offsetHeight;
        if (document.body.scrollTop > heroHeight || document.documentElement.scrollTop > heroHeight) {
            el.style.padding    = '16px';
            el.style.maxHeight  = el.scrollHeight + "px";
        } else {
            el.style.maxHeight  = null;
            el.style.padding    = '0';
        }
    }
}
document.querySelectorAll('.hero').forEach(processHero);
document.querySelectorAll('.brick').forEach(processBrick);
document.querySelectorAll('.faq').forEach(processFaq);
document.querySelectorAll('.banner').forEach(processBanner);