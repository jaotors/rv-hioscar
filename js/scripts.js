function numbersOnly(e) {
  if(!e.key.match(/([0-9])/g)) e.preventDefault()
}

function ageLength(e) {
  if(e.target.value.length > 2) e.preventDefault()
}

function zipLength(e) {
  if(e.target.value.length > 3) e.preventDefault()
}

function removeError(name) {
  //removing the current errors
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

  if(!zipcodes.includes(data)) {
    errors.push(errCodes[0])
  }

  if(data.length < 4) {
    errors.push(errCodes[1])
  }

  return {
    errors: errors
  }
}

function generateCover() {
  let cover = document.getElementById('wrapCover')
  if(cover != null) cover.remove()

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

  let select = document.createElement('select')
  let paragraph = document.createElement('p')
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
  }).reverse()

  paragraph.append(select)

  return paragraph
}

function generateInitialError(input) {
  let errors = []
  let errCodes = [
    `Your age is required to get a quote`,
    `Your spouse’s age is required to get a quote`,
    `All ages are required to get a quote`
  ]

  let inputs = input.getElementsByTagName('input')
  let select = input.getElementsByTagName('select')

  if(inputs.length == 1) {
    errors.push(errCodes[0])
  } else {
    errors.push(errCodes[0], errCodes[1])
  }

  if(select.length > 0) {
    errors.push(errCodes[2])
  }

  return errors
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

function generateInput(value) {
  let ageInput = document.getElementById('ageInput')
  if (ageInput != null) ageInput.remove()

  let chooseInput = [
    `I'm <input name="your" id="myAge" type="text"> years old`,
    `I'm <input name="your" id="myAge" type="text"> years old and my spouse is <input name="spouse" id="spouseAge" type="text">`,
    `I'm <input name="your" id="myAge" type="text"> years old and my spouse is <input name="spouse" id="spouseAge" type="text"> and my <select id="kidSelect"></select> <span id="replaceText">kid is</span>`,
    `I'm <input name="your" id="myAge" type="text"> years old and my <select id="kidSelect"></select> <span id="replaceText">kid is</span>`
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
  let kidsAgeContainer = document.getElementById('kidsAgeContainer')
  let replaceText = document.getElementById('replaceText')
  let ageSelect = document.getElementById('ageSelect')
  if(kidsAgeContainer != null) kidsAgeContainer.remove()

  par.id = 'kidsAgeContainer'

  if(num == 1) {
    par.innerHTML += `<input class="kidsAge" type="text">.`
  } else if (num == 2) {
    par.innerHTML += `<input class="kidsAge" type="text"> and <input class="kidsAge" type="text">.`
  } else {
    for(let i = 1; i <= num; i++) {
      if(i < (num-1) ) {
        par.innerHTML += `<input class="kidsAge" type="text">,`
      } else if (i == (num-1)) {
        par.innerHTML += `<input class="kidsAge" type="text">, and`
      } else if (i == num) {
        par.innerHTML += `<input class="kidsAge" type="text">.`
      }
    }
  }
  replaceText.after(par)
  let kidsInputs = par.getElementsByTagName('input')

  return kidsInputs
}

function getKidsInputError(kid, inputs) {
  let error = `All ages are required to get a quote`

  let input = Array.from(inputs)
  let withError = input.some(err => err.value == '')

  if(!withError) {
    error = ''
  }

  return {
    id: 'kidsAge',
    error: error
  }
}

function form() {
  let inputZip = document.getElementById('zipcode')
  let container = document.getElementById('container')
  let newContainer = document.getElementById('continue-container')

  inputZip.addEventListener('keypress', (e) => {
    numbersOnly(e)
    zipLength(e)
  })

  inputZip.addEventListener('keyup', (e) => {
    const {errors} = generateZipCode(e.target.value)
    if(errors.length > 0) {
      let err = putError(errors, 'zip')
      inputZip.after(err)
    } else {
      removeError('zip')
      let selectCover = generateCover()
      newContainer.append(selectCover)

      selectCover.addEventListener('change', (e) => {
        const {value, errors, elems} = generateInput(e.target.selectedIndex)
        let err = putError(errors, 'cover')
        let combinedErrors = []
        newContainer.append(value)
        value.after(err)

        for(input of elems.inputs) {
          input.addEventListener('keypress', e => {
            numbersOnly(e)
            ageLength(e)
          })
          input.addEventListener('keyup', e => {
            let newError = getInputError(e.target)

            if(!combinedErrors.some(err => err.id === newError.id)) {
              combinedErrors.push(newError)
            } else {
              combinedErrors.map(err => {
                if(err.id === newError.id) {
                  err.error = newError.error
                }
              })
            }

            // @@@ remove the error if the input is passed

            let setErrors = combinedErrors.map(err => err.error)
            let err = putError(setErrors, 'cover')
            value.after(err)
          })
        }

        if(elems.select != undefined) {
          let selectKids = elems.select

          selectKids.addEventListener('change', e => {
            let kidInputs = generateKidsInput(e.target.value)

            for(kidInput of kidInputs) {
              kidInput.addEventListener('keyup', e => {
                let newError = getKidsInputError(e.target, kidInputs)

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
                }

                // @@@ remove the error if the input is passed

                let setErrors = combinedErrors.map(err => err.error)
                let err = putError(setErrors, 'cover')
                value.after(err)
              })
            }
          })
        }
      })
    }
  })
}

//start
form()
