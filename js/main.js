const APP = {
  init() {
    // APP.httpRequest();

    const button = document.getElementById('myButton');

    APP.fetchData();
    let statement = document.createElement('p');
    statement.setAttribute('id', 'statement');
    button.parentNode.insertBefore(statement, button.nextSibling);
  },

  httpRequest() {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });

    xhr.open('GET', 'https://api.sandbox.metriport.com/medical/v1/patient/');
    xhr.setRequestHeader(
      'x-api-key',
      'VDdVVzA4Z0o1WExWQUZ1ZllKR1o5OmYyY2ZkYzY0LTA5MDAtNGVmZi1iN2NkLWE2YjRiZGM4ZTI0Ng'
    );

    xhr.send(data);
  },

  fetchData() {
    // Fetching URL
    fetch('https://lizzietse0617.github.io/demo/js/patient.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        APP.patientInfo(data);

        //in here there will be a select (with 4 options) is generated with the use of javascript
        APP.selectReport(data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  selectReport(data) {
    // Generate the select element with options
    const selectElement = document.getElementById('select');

    const options = data.test_results.map((result) => result.test_name);

    const formHTML = `
    <form action="/action_page.php">
      <label for="tests">Choose a test:</label>
      <select name="tests" id="tests">
        ${options
          .map((option) => `<option value="${option}">${option}</option>`)
          .join('')}
      </select>
    
    </form>
  `;

    selectElement.innerHTML = formHTML;

    APP.selectOption(data);
  },

  selectOption(data) {
    let tests = document.getElementById('tests');
    document.getElementById('tests').addEventListener('change', () => {
      let selectTest = tests.value;
      APP.reportInfo(selectTest, data);
    });
  },

  patientInfo(data) {
    document.getElementById('patient-fname').textContent = data.patient_name;
    document.getElementById('patient-dob').textContent = data.date_of_birth;
  },

  reportInfo(selectTest, data) {
    document.getElementById('selectTest').textContent =
      'Select test: ' + JSON.stringify(selectTest).replace(/"/g, '');

    const testResult = data.test_results.find(
      (result) => result.test_name === selectTest
    );

    document.getElementById('myButton').addEventListener('click', () => {
      let result = testResult.abnormal ? 'abnormal' : 'normal';
      document.getElementById(
        'report'
      ).innerHTML = `Test Name: ${testResult.test_name}, Your Value: ${testResult.value}${testResult.unit}, Reference Range: ${testResult.reference_range}, Result: ${result}`;

      // Create the img element

      let report = document.getElementById('report');
      const ref1 = document.createElement('img');
      ref1.src = 'https://lizzietse0617.github.io/demo/image/Frame%203.png';
      ref1.style.marginBottom = '10px';
      report.insertBefore(ref1, report.childNodes[2]);

      const ref2 = document.createElement('img');
      ref2.src = 'https://lizzietse0617.github.io/demo/image/Frame%204.png';
      ref2.style.marginBottom = '10px';
      report.insertBefore(ref2, report.childNodes[2]);

      const ref3 = document.createElement('img');
      ref3.src = 'https://lizzietse0617.github.io/demo/image/Frame%205.png';
      ref3.style.marginBottom = '10px';
      report.insertBefore(ref3, report.childNodes[2]);

      /* NLP */
      // Create the img element
      const imgElement = document.createElement('img');
      imgElement.src =
        'https://lizzietse0617.github.io/demo/image/Frame%201.png';
      const parentElement = document.querySelector('.contact-prompt');
      parentElement.insertBefore(imgElement, parentElement.childNodes[2]);

      /* CHATGBT */
      const imgChat = document.createElement('img');
      imgChat.src = 'https://lizzietse0617.github.io/demo/image/Frame%202.png';
      const parentChat = document.querySelector('.chatbox');
      parentChat.insertBefore(imgChat, parentChat.childNodes[2]);
    });
  },
};

document.addEventListener('DOMContentLoaded', function () {
  APP.init();
});
