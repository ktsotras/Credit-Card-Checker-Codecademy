// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
//Uses the Luhn Algorithm to return the credit card number before the last step of using mod 10 to allow for credit card creation
const luhnCheck = credNum => {
  let numSum = 0;
  for(let i = credNum.length-1; i >= 0; i--){
    let currentNum = credNum[i];
    
    //Easier to use the card length minus i in order to count the card numbers from 0 for when multiplying is needed
    if((credNum.length-1 - i) % 2 === 1){
      currentNum *= 2;
      if(currentNum > 9)
        currentNum -= 9;
    }
    numSum+= currentNum;
  }
  return numSum;
}

//Checks any credit card passed if it is a valid credit card number
const validateCred = credCard => {
  return luhnCheck(credCard) % 10 === 0;
}

//Uses validateCred to find invalid card numbers in a nested array and return all the invalid numbers in a nested array
const findInvalidCards = credCards => {
  let invalidCards = [];
  for(let i = 0; i < credCards.length; i++){
    
    //If the card fails validation it gets added to the invalidCards array
    if(!validateCred(credCards[i]))
      invalidCards.push(credCards[i]);
  }
  return invalidCards;
}

//Goes through a nested array of credit cards and identifies the companies associated with the number based on the first digit
const idInvalidCardCompanies = invalidCards => {
  let companiesArray = [];
  let company = " ";
  
  //goes through each card number checking the first digit
  for(let i = 0; i < invalidCards.length; i++){
    if(invalidCards[i][0] === 3)
      company = "Amex (American Express)";
    else if(invalidCards[i][0] === 4)
      company = "Visa";
    else if(invalidCards[i][0] === 5)
      company = "Mastercard";
    else if(invalidCards[i][0] === 6)
      company = "Discover";
    else
      console.log('Company not found');

    //checks if company name is already in the array before adding it
    if(companiesArray.indexOf(company) === -1)
      companiesArray.push(company);
  }
  return companiesArray;
}

//converts a string of a credit card number into an array of digits
const stringToCredNum = credNumString => {
  return Array.from(String(credNumString), Number);
}

//Takes an invalid credit card number and returns a new valid number while keeping the first digit
const fixInvalidCard = invalidCard => {
  let newCard = [];
  
  //keeping the first digit
  newCard.push(invalidCard[0]);

  //generating new numbers before the last digit
  for(let i = 0; i < invalidCard.length-2; i++){
    newCard.push(Math.floor(Math.random() * 10));
  }
  
  //insert a zero to complete the Luhn algorithm correctly and then remove it
  newCard.push(0);
  let lastDigit = luhnCheck(newCard);
  newCard.pop();
  
  //use the returned total to calculate the last digit needed in order to validate the new random credit card number
  lastDigit = 10 - (lastDigit % 10);
  newCard.push(lastDigit);
  
  return newCard;
}

