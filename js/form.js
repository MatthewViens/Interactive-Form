// Select elements for later manipulation
const form = document.querySelector('form'),
      title = document.getElementById('title'),
      otherTitle = document.getElementById('other-title'),
      activities = document.querySelector('.activities'),
      total = document.createElement('h3'),
      colorDiv = document.getElementById('colors-js-puns'),
      color = document.getElementById('color'),
      payment = document.getElementById('payment'),
      creditCard = document.getElementById('credit-card'),
      paypal = document.querySelector('.paypal'),
      bitcoin = document.querySelector('.bitcoin'),
      name = document.getElementById('name'),
      mail = document.getElementById('mail'),
      submit = document.querySelector('button'),
      ccNumber = document.getElementById('cc-num'),
      zipNumber = document.getElementById('zip'),
      cvvNumber = document.getElementById('cvv');

// Set default credit card validity state.
let ccNumberValidity = false,
    zipNumberValidity = false,
    cvvNumberValidity = false;

// Create a div to output validation feedback in real time when entering
// credit card information.
const messageDiv = document.createElement('div');
messageDiv.classList.add('invalid-text');
      ccMessage = document.createElement('h3');
      zipMessage = document.createElement('h3');
      cvvMessage = document.createElement('h3');
messageDiv.appendChild(ccMessage);
messageDiv.appendChild(zipMessage);
messageDiv.appendChild(cvvMessage);
creditCard.appendChild(messageDiv);

// Create arrays for color options from HTML.
const colorOptions = Array.from(color.children);
      JSPuns = [];
      heartJS = [];
// Sort HTML shirt option elements depending on text content.
for(let i = 0; i < colorOptions.length; i++){
  if(colorOptions[i].textContent.includes('Puns')){
    JSPuns.push(colorOptions[i]);
  } else if(colorOptions[i].textContent.includes('♥')){
    heartJS.push(colorOptions[i]);
  }
}

// Set default for page load:
    // other-title text input should be hidden.
    // clear t-shirt color options.
    // total amount due set to 0 and hidden.
    // hide payment information.
    // credit card is default payment option.
    // hide all other payment options
otherTitle.style.display = 'none';
colorDiv.style.display = 'none';
let amountDue = 0;
total.style.display = 'none';
activities.appendChild(total);
document.querySelector('#payment option[value="credit-card"]')
  .setAttribute('selected', true);
paypal.style.display = 'none';
bitcoin.style.display = 'none';

// Add focus to first input field on form when page loads.
name.focus();

// Helper function to select all siblings of an element that are the same type.
function getSiblings(element){
  let siblings = [];
  let children = element.parentNode.children;
  for(let i = 0; i < children.length; i++){
    if (children[i] != element && children[i].tagName === element.tagName){
      siblings.push(children[i]);
    }
  }
  return siblings;
}

// Helper function to parse time and cost from activities inputs.
function parseActivity(activity){
  let activityData = [];
  activity = activity.textContent;
  if (activity.indexOf(',') !== -1){
    activityData.push(activity.slice((activity.indexOf('—')+2), activity.indexOf(',')));
    activityData.push(activity.slice((activity.indexOf(',')+3), activity.length));
  } else {
    activityData.push('');
    activityData.push(activity.slice((activity.indexOf('—')+3), activity.length));
  }
  return activityData;
}

// Helper function, returns true if argument is a number.
function isNumber(number){
  let re = /^\d+$/;
  return re.test(number);
}

// Helper function, returns true if argument contains only whitespace.
function isEmpty(value){
  return value.trim() === '';
}

// Add event listener so that when title select changes to 'other', a text
// input appears.
title.addEventListener('change', (e) => {
  if (e.target.value === 'other'){
    otherTitle.style.display = '';
  } else {
    otherTitle.style.display = 'none';
  }
});

// Add event listener so that when design select changes, color options change
// accordingly.
document.getElementById('design').addEventListener('change', (e) => {
  let selection = e.target.value;
  color.innerHTML = '';
  if(selection === 'js puns'){
    for(let i = 0; i < JSPuns.length; i++){
      color.appendChild(JSPuns[i]);
    }
  } else if(selection === 'heart js'){
    for(let i = 0; i < heartJS.length; i++){
      color.appendChild(heartJS[i]);
    }
  }
  colorDiv.style.display = '';
});

// Add event listener to events on change.
  // Get siblings of elemen.
  // Capture times and prices with parseActivity().
  // Disable events that occur at the same time.
  // Update total.
  // Show/hide total.
activities.addEventListener('change', (e) => {
  let activities = getSiblings(e.target.parentNode);
  let eventData = parseActivity(e.target.parentNode);
  if (e.target.checked){
    amountDue += parseInt(eventData[1]);
    for(let i = 0; i < activities.length; i++){
      if (parseActivity(activities[i])[0] === eventData[0]){
        activities[i].firstElementChild.disabled = true;
      }
    }
  } else {
    amountDue -= parseInt(eventData[1]);
    for(let i = 0; i < activities.length; i++){
      if (parseActivity(activities[i])[0] === eventData[0]){
        activities[i].firstElementChild.disabled = false;
      }
    }
  }
  total.textContent = `Total: ${amountDue}`;
  if (amountDue > 0){
    total.style.display = 'block';
  } else {
    total.style.display = 'none';
  }
});

// Add event listener to payment select on change.
  // Hide all payment divs.
  // Get value of selected payment option.
  // Show appropriate payment information.
payment.addEventListener('change', (e) => {
  creditCard.style.display = 'none';
  paypal.style.display = 'none';
  bitcoin.style.display = 'none';
  let selected = e.target.value;
  for(let i = 0; i < payment.children.length; i++){
    if(payment.children[i].value === selected){
      document.querySelector(`.${selected}`).style.display = '';
    }
  }
});

// Add event listener to credit card number input.
    // Give real-time feedback based on current state of input.
ccNumber.addEventListener('keyup', () => {
  console.log('pressed');
  value = ccNumber.value;
  ccMessage.textContent = '';
  if (isEmpty(value)){
    console.log('empty');
    ccMessage.textContent = "Credit Card: Can't be blank";
    ccNumber.classList.add('invalid');
    ccNumberValidity = false;
  } else if (!isNumber(value)){
    ccMessage.textContent = "Credit Card: Must be a number";
    ccNumber.classList.add('invalid');
    ccNumberValidity = false;
  } else if (value.length < 13 || value.length > 16){
    ccMessage.textContent = "Credit Card: Must be between 13 and 16 digits";
    ccNumber.classList.add('invalid');
    ccNumberValidity = false;
  } else {
    ccNumber.classList.remove('invalid');
    ccNumberValidity = true;
  }
});

// Add event listener to zip code input for credit card.
    // Give real-time feedback based on current state of input.
zipNumber.addEventListener('keyup', () => {
  console.log('pressed');
  value = zip.value;
  zipMessage.textContent = '';
  if (isEmpty(value)){
    console.log('empty');
    zipMessage.textContent = "Zip Code: Can't be blank";
    zipNumber.classList.add('invalid');
    zipNumberValidity = false;
  } else if (!isNumber(value)){
    zipMessage.textContent = "Zip Code: Must be a number";
    zipNumber.classList.add('invalid');
    zipNumberValidity = false;
  } else if (value.length !== 5){
    zipMessage.textContent = "Zip Code: Must be 5 digits";
    zipNumber.classList.add('invalid');
    zipNumberValidity = false;
  } else {
    zipNumber.classList.remove('invalid');
    zipNumberValidity = true;
  }
});

// Add event listener to cvv input for credit card.
    // Give real-time feedback based on current state of input.
cvvNumber.addEventListener('keyup', () => {
  console.log('pressed');
  value = cvv.value;
  cvvMessage.textContent = '';
  if (isEmpty(value)){
    console.log('empty');
    cvvMessage.textContent = "CVV: Can't be blank";
    cvvNumber.classList.add('invalid');
    cvvNumberValidity = false;
  } else if (!isNumber(value)){
    cvvMessage.textContent = "CVV: Must be a number";
    cvvNumber.classList.add('invalid');
    cvvNumberValidity = false;
  } else if (value.length !== 3){
    cvvMessage.textContent = "CVV: Must be 3 digits";
    cvvNumber.classList.add('invalid');
    cvvNumberValidity = false;
  } else {
    cvvNumber.classList.remove('invalid');
    cvvNumberValidity = true;
  }
});

// Add event listener to form submit.
  // Prevent default behavior.
  // Store true or false in array for each input validation.
  // If array contains no false values, submit form.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let formValidity = [];
  formValidity.push(validateName());
  formValidity.push(validateEmail());
  formValidity.push(validateJobRole());
  formValidity.push(validateShirt());
  formValidity.push(validateActivities());
  if(payment.value === 'credit-card'){
    formValidity.push(ccNumberValidity);
    formValidity.push(zipNumberValidity);
    formValidity.push(cvvNumberValidity);
  }
  if (!(formValidity.includes(false))){
    form.submit();
  }
});

// Validates name input.
    // Checks if name is emtpy and returns true or false depending on weather input
    // is valid or not.
function validateName() {
  if(isEmpty(name.value)){
    name.classList.add('invalid');
    name.setAttribute('placeholder', "Please enter your name");
    return false;
  } else {
    name.classList.remove('invalid');
    return true;
  }
}

// Validates email adress.
    // Checks if input is empty.
    // Compares input to regex.
    // Returns true or false depending on weather input is valid or not.
function validateEmail() {
  let mailre = /\S+@\S+\.\S+/;
  if(isEmpty(mail.value)){
    mail.classList.add('invalid');
    mail.value = '';
    mail.setAttribute('placeholder', "Please enter your email address");
    return false;
  } else if(!mailre.test(mail.value)){
    mail.classList.add('invalid');
    mail.value = '';
    mail.setAttribute('placeholder', 'Email address must be valid');
    return false;
  } else {
    mail.style.border = '';
    return true;
  }
}

// Validates job role 'other' input.
    // Checks in input is empty.
    // Returns true or false depending on weather input is valid or not.
function validateJobRole(){
  if(title.value === 'Other'){
    if(otherTitle.value.trim() === ''){
      otherTitle.classList.add('invalid');
      otherTitle.value = '';
      otherTitle.setAttribute('placeholder', 'Please enter your job role');
      return false;
    } else {
      otherTitle.style.border = '';
      return true;
    }
  }
  return true;
}

// Validates shirt selection.
    // Checks to see any shirt design besides default 'Select Theme' is selected.
    // Returns true or false depending on weather input is valid or not.
function validateShirt() {
  const shirtDiv = document.querySelector('.shirt');
  if(document.getElementById('design').value !== "Select Theme"){
    shirtDiv.classList.remove('invalid');
    return true;
  }
  shirtDiv.classList.add('invalid');
  return false;
}

// Validates activities.
    // Checks to make sure at least one activity is selected based on total cost.
    // Returns true or false depending on weather input is valid or not.
function validateActivities() {
  if(amountDue > 0){
    activities.classList.remove('invalid');
    return true;
  }
  activities.classList.add('invalid');
  return false;
}
