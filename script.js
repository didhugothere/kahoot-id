const answers = document.getElementById("answers");
const search = document.getElementById("search");
const quizID = document.getElementById("quiz-id");

document.getElementById("search").onclick = () => {
  console.log(quizID.value);
  fetch(
    `https://api.codetabs.com/v1/proxy/?quest=https://play.kahoot.it/rest/kahoots/${quizID.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      Object.entries(data.questions).forEach((key, value) => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const span = document.createElement("span");
        const layout = key[1].layout;
        p.innerText = key[1].question;
        div.appendChild(p);
        // console.log(key);
        // console.log(key[1]);
        // console.log(key[1].choices);
        // console.log(key[1].question);
        Object.entries(key[1].choices).forEach((key, value) => {
          //console.log(key,value);
          if (key[1].correct) {
            span.innerText = key[1].answer;
            if (layout === "CLASSIC") {
              if (value === 0) {
                span.classList.add("zero");
              } else if (value === 1) {
                span.classList.add("one");
              } else if (value === 2) {
                span.classList.add("two");
              } else if (value === 3) {
                span.classList.add("three");
              }
            } else if (layout === "TRUE_FALSE") {
              if (value === 0) {
                span.classList.add("one");
              } else if (value === 1) {
                span.classList.add("zero");
              }
            } else {
              span.innerText =
                "Warning: There are multiple answers to this question but here's one: " +
                key[1].answer;
              span.classList.add("warning");
            }
            div.appendChild(span);
            answers.appendChild(div);
          }
        });
      });
    });
  // const div = document.createElement("div");
  // const p = document.createElement("p");
  // const span = document.createElement("span");
  // p.innerText = "test1";
  // span.innerText = "test2";
  // div.appendChild(p);
  // div.appendChild(span);
  // answers.appendChild(div);
};
