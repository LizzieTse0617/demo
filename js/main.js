const APP = {
  ApiKey: '1c4594ccfd9edff47e21eec5c33678e6',

  init() {
    const button = document.getElementById('myButton');

    APP.fetchData();

    // Score number + 'you are doing fine'
    let statement = document.createElement('p');
    statement.setAttribute('id', 'statement'); // Add id to the statement element
    button.parentNode.insertBefore(statement, button.nextSibling);
  },

  fetchData() {
    // Fetching URL
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        APP.patientInfo(data);
        document.getElementById('myButton').addEventListener('click', () => {
          APP.reportInfo(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  patientInfo(data) {
    document.getElementById('patient-fname').textContent = data.title;
  },

  reportInfo(data) {
    const statement = document.getElementById('statement');

    // Update the statement once data is fetched
    if (data.userId < 3) {
      statement.textContent = 'Score:' + data.userId + '. You are doing fine';
      statement.style.color = 'green';
    } else {
      statement.textContent = 'Score:' + data.userId;
      statement.style.color = 'black';
    }

    //test report (text)
    document.getElementById('report-container').textContent =
      JSON.stringify(data);
    document.getElementById('report-container').style.backgroundColor = 'white';
  },
};

document.addEventListener('DOMContentLoaded', function () {
  APP.init();
});
