function removeError(name) {
  let errCont = document.getElementsByClassName(`error-${name}`)
  if(errCont.length > 0) {
    for(err of errCont) {
      err.remove()
    }
  }
}

function putError(errors, name) {
  removeError(name)

  let error_ul = document.createElement('ul')
  error_ul.className += `error-${name} error`
  errors.map((err) => {
    let li = document.createElement('li')
    li.innerHTML = err
    error_ul.append(li)
  })
  return error_ul
}

function generateZipCode(data) {
  const zipcodes = ["1226","1233","1209","1214","1217","1221","1222","1219","1220","1202","1201","1228","1212","1211","1206","1204","1229","1232","1224","1200","1207","1235","1231","1218","1213","1230","1210","1216","1215","1227","1203","1234","1223","1205","1225","1208"]
  const errCodes = [
    `Unfortunately there is no ZIP code like that in makati`,
    `ZIP code must be 4 digits`
  ]
  let errors = []

  if(!zipcodes.includes(data)) errors.push(errCodes[0])

  if(data.length < 4 || data.length > 4) errors.push(errCodes[1])

  return errors
}

function generateCover() {
  let select = document.createElement('select')
  let paragraph = document.createElement('p')

  const selectBox = {
    name: 'cover',
    id: 'getCover',
    options: [
      {value: 0, label: '', disabled: true, selected: true},
      {value: 1, label: 'me', disabled: false, selected: false},
      {value: 2, label: 'me and my spouse', disabled: false, selected: false},
      {value: 3, label: 'me, my spouse, and my kids', disabled: false, selected: false},
      {value: 4, label: 'me and my kids', disabled: false, selected: false}
    ]
  }

  paragraph.id = `wrapCover`
  paragraph.innerHTML = `I'd like to cover `
  select.id = selectBox.id
  select.name = selectBox.name

  selectBox.options.map((opt) => {
    let option = document.createElement('option')
    option.innerHTML = opt.label
    option.value = opt.value
    option.disabled = opt.disabled
    option.selected = opt.selected

    select.append(option)
  })

  paragraph.append(select)

  return paragraph
}

function generateYearlyMoney() {
  let yearlyMoney = document.getElementById('wrapMoney')
  if(yearlyMoney != null) yearlyMoney.remove()
  let paragraph = document.createElement('p')

  paragraph.id = `wrapMoney`
  paragraph.innerHTML = `My family makes P<input id="yearlyMake" type="number" /> yearly with <select id="numberTax"></select> people in my tax household.`

  let selectBox = paragraph.getElementsByTagName('select')[0]
  for(let i = 0; i < 9; i++) {
    let opt = document.createElement('option')
    opt.value = i
    opt.innerHTML = i

    if(i === 0) {
      opt.value = i
      opt.innerHTML = ''
      opt.disabled = true
      opt.selected = true
    } else if (i === 8) {
      opt.innerHTML = `${i}+`
    }
    selectBox.append(opt)
  }

  return paragraph
}

function generateInitialError(input) {
  let errors = []
  let errCodes = [
    `Your age is required to get a quote`,
    `Your spouse’s age is required to get a quote`,
    `All ages are required to get a quote`
  ]

  let error = {}

  let inputs = input.getElementsByTagName('input')
  let select = input.getElementsByTagName('select')

  if(inputs.length == 1) {
    error = {
      id: 'myAge',
      error: errCodes[0]
    }
    errors.push(error)
  } else {
    let mapInput = Array.from(inputs)

    mapInput.map((input, index) => {
      error = {
        id: input.id,
        error: errCodes[index]
      }
      errors.push(error)
    })
  }

  if(select.length > 0) {
    error = {
      id: 'kidsAge',
      error: errCodes[2]
    }
    errors.push(error)
  }

  return errors
}

function getInputError(input) {
  const errCodes = [
    `Hey youngster, you have to be 18 or older to sign up with Oscar`,
    `Your spouse needs to be at least 18 years old`,
    `Your age is required to get a quote`,
    `Your spouse’s age is required to get a quote`
  ]

  let error = {
    id: input.id,
    error: (input.id === 'myAge') ? errCodes[2] : errCodes[3]
  }

  if(input.id === 'myAge') {
    if(input.value === '') {
      error.error = errCodes[2]
    } else if(input.value < 18) {
      error.error = errCodes[0]
    } else {
      error.error = ''
    }
  }

  if(input.id === 'spouseAge') {
    if(input.value === '') {
      error.error = errCodes[3]
    } else if(input.value < 18) {
      error.error = errCodes[1]
    } else {
      error.error = ''
    }
  }
  return error
}

function generateElements(input) {
  let inputs = input.getElementsByTagName('input')
  let select = input.getElementsByTagName('select')[0]
  
  if (select != null) {
    for(let i = 0; i < 10; i++) {
      let opt = document.createElement('option')
      opt.value = i
      opt.innerHTML = i

      if(i === 0) {
        opt.innerHTML = ''
        opt.selected = true
        opt.disabled = true
      }
      select.append(opt)
    }
  }

  return {
    inputs,
    select
  }
}

function generateInput(value) {
  removeElemId('ageInput')

  let chooseInput = [
    `I'm <input name="your" id="myAge" min="0" max="999" type="number"> years old`,
    `I'm <input name="your" id="myAge" min="0" max="999" type="number"> years old and my spouse is <input name="spouse" min="0" max="9999" id="spouseAge" type="number">`,
    `I'm <input name="your" id="myAge" min="0" max="999" type="number"> years old and my spouse is <input name="spouse" min="0" max="9999" id="spouseAge" type="number"> and my <select id="kidSelect"></select> <span id="replaceText">kid is</span>`,
    `I'm <input name="your" id="myAge" min="0" max="999" type="number"> years old and my <select id="kidSelect"></select> <span id="replaceText">kid is</span>`
  ]

  let paragraph = document.createElement('p')
  let span = document.createElement('span')
  paragraph.id = `ageInput`

  span.innerHTML = chooseInput[value-1]

  paragraph.append(span)

  let errors = generateInitialError(paragraph)
  let elems = generateElements(paragraph)

  return {
    value: paragraph,
    errors: errors,
    elems: elems
  }
}

function generateKidsInput(num) {
  let par = document.createElement('span')
  let replaceText = document.getElementById('replaceText')
  let ageSelect = document.getElementById('ageSelect')
  removeElemId('kidsAgeContainer')

  par.id = 'kidsAgeContainer'

  if(num == 1) {
    par.innerHTML += `<input min="0" max="999" class="kidsAge" type="number">.`
  } else if (num == 2) {
    par.innerHTML += `<input min="0" max="999" class="kidsAge" type="number"> and <input min="0" max="999" class="kidsAge" type="number">.`
  } else {
    for(let i = 1; i <= num; i++) {
      if(i < (num-1) ) {
        par.innerHTML += `<input min="0" max="999" class="kidsAge" type="number">,`
      } else if (i == (num-1)) {
        par.innerHTML += `<input min="0" max="999" class="kidsAge" type="number">, and`
      } else if (i == num) {
        par.innerHTML += `<input min="0" max="999" class="kidsAge" type="number">.`
      }
    }
  }
  replaceText.after(par)
  if(num > 1) replaceText.innerHTML = 'kids are'
  const kidsInputs = par.getElementsByTagName('input')

  return kidsInputs
}

function getKidsInputError(kid, inputs) {
  let error = `All ages are required to get a quote`

  const input = Array.from(inputs)
  let withError = input.some(err => err.value == '')

  if(!withError) {
    error = ''
  }

  return {
    id: 'kidsAge',
    error: error
  }
}

function generateButton() {
  removeElemId('nextBtn')

  let btn = document.createElement('button')
  btn.id = `nextBtn`
  btn.innerHTML = `Next`

  return btn
}

function eightDigitsOnly(value) {
  let errors = []
  if(value.length > 8) {
    errors.push(`Valid income value is required to get a quote`)
  }

  return errors
}

function removeElemId(id) {
  const removeEl = document.getElementById(id)
  if(removeEl != null) removeEl.remove()
}

function inputEvent({newError, combinedErrors, value}) {
  const newContainer = document.getElementById('continue-container')
  const quoteContainer = document.getElementsByClassName('quote-container')[0]
  const checkListContainer = document.getElementById('check-list-container')
  const letContinue = Array.from(newContainer.getElementsByTagName('input'))

  if(newError.error != '') {
    if(!combinedErrors.some(err => err.id === newError.id)) {
      combinedErrors.push(newError)
    } else {
      combinedErrors.map(err => {
        if(err.id === newError.id) {
          err.error = newError.error
        }
      })
    }
    let setErrors = combinedErrors.map(err => err.error)
    let err = putError(setErrors, 'cover')
    value.after(err)
  } else {
    combinedErrors = combinedErrors.filter((err, index) => {
      return err.id != newError.id
    })
    let setErrors = combinedErrors.map(err => err.error)
    let err = putError(setErrors, 'cover')
    value.after(err)
  }

  if(combinedErrors.length < 1) {
    const taxContainer = generateYearlyMoney()
    newContainer.append(taxContainer)
    const input = document.getElementById('yearlyMake')
    const numberTax = document.getElementById('numberTax')

    input.addEventListener('keyup', e => {
      removeElemId('nextBtn')
      
      if(combinedErrors.length < 1) {
        if(e.target.value > 0 || e.target.value != '') {
          let setErrors = eightDigitsOnly(e.target.value)
          let err = putError(setErrors, 'money')
          taxContainer.after(err)
          
          if(setErrors.length < 1 && numberTax.selectedIndex != 0) {
            let nextBtn = generateButton()
            taxContainer.append(nextBtn)

            nextBtn.addEventListener('click', e => {
              let testContinue = letContinue.some(inputVal => inputVal.value.match(/([^0-9])+/g))

              if(!testContinue) {
                quoteContainer.style.display = "none"
                checkListContainer.style.display = 'block'
              } else {
                alert(`There are inputs that have a letter or special characters.`)
              }
            })
          }
        }
      }
    })

    numberTax.addEventListener('change', (e) => {
      removeElemId('nextBtn')

      if(combinedErrors.length < 1) {
        if(input.value > 0 || input.value != '') {
          let setErrors = eightDigitsOnly(input.value)
          let err = putError(setErrors, 'money')
          taxContainer.after(err)
          
          if(setErrors.length < 1 && numberTax.selectedIndex != 0) {
            let nextBtn = generateButton()
            taxContainer.append(nextBtn)

            nextBtn.addEventListener('click', e => {
              let testContinue = letContinue.some(inputVal => {
                return inputVal.value.match(/([^0-9])+/g)
              })

              if(!testContinue) {
                quoteContainer.style.display = "none"
                checkListContainer.style.display = 'block'
              } else {
                alert(`There are inputs that has a letter or special characters.`)
              }
            })
          }
        }
      }
    })
  } else {
    removeElemId('nextBtn')
  }
  return combinedErrors
}

function form() {
  const inputZip = document.getElementById('zipcode')
  const container = document.getElementById('container')
  const newContainer = document.getElementById('continue-container')
  const quoteContainer = document.getElementsByClassName('quote-container')[0]
  const checkListContainer = document.getElementById('check-list-container')
  const thankYouContainer = document.getElementById('thank-you-container')
  const doneContainer = document.getElementById('done-container')
  const checks = checkListContainer.getElementsByTagName('input')
  const arrChecks = Array.from(checks)
  const nextStep = document.getElementById('nextStep')

  checkListContainer.style.display = "none"
  thankYouContainer.style.display = "none"
  doneContainer.style.display = "none"

  inputZip.addEventListener('keyup', (e) => {
    const errors = generateZipCode(e.target.value)
    if(errors.length > 0) {
      const err = putError(errors, 'zip')
      inputZip.after(err)
      removeElemId('nextBtn')
    } else {
      removeError('zip')
      removeError('cover')
      removeError('money')
      removeElemId('wrapCover')
      removeElemId('ageInput')
      removeElemId('wrapMoney')
      const selectCover = generateCover()
      newContainer.append(selectCover)

      selectCover.addEventListener('change', (e) => {
        const {value, errors, elems} = generateInput(e.target.selectedIndex)
        let combinedErrors = errors
        let setErrors = combinedErrors.map(err => err.error)
        let err = putError(setErrors, 'cover')
        removeElemId('wrapMoney')
        newContainer.append(value)
        value.after(err)

        for(input of elems.inputs) {
          input.addEventListener('keyup', e => {
            let newError = getInputError(e.target)
            combinedErrors = inputEvent({newError,combinedErrors,value})
          })
        }

        if(elems.select != undefined) {
          const selectKids = elems.select

          selectKids.addEventListener('change', e => {
            let kidInputs = generateKidsInput(e.target.value)

            for(kidInput of kidInputs) {
              kidInput.addEventListener('keyup', e => {
                let newError = getKidsInputError(e.target, kidInputs)
                combinedErrors = inputEvent({newError,combinedErrors,value})
              })
            }
          })
        }
      })
    }
  })

  arrChecks.map(check => {
    check.addEventListener('change', () => {
      let inputChecks = arrChecks.some(checks => checks.checked === true)
      nextStep.innerHTML = (inputChecks === true) ? 'Get Quote' : 'Skip'
    })
  })

  nextStep.addEventListener('click', () => {
    checkListContainer.style.display = "none"
    thankYouContainer.style.display = "block"
    let rotate = thankYouContainer.getElementsByClassName('loader')[0]

    let i = 10
    let interval = setInterval(() => {
      rotate.style.transform = `rotate(${i}deg)`
      i += 100
    }, 100)

    setTimeout(() => {
      clearInterval(interval)
      thankYouContainer.style.display = "none"
      doneContainer.style.display = "block"
    }, 4000)
  })
}

//start
form()
