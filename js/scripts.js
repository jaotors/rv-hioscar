function numbersOnly(e) {
  if(!e.key.match(/([0-9])/g)) e.preventDefault()
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
  select.id = selectBox.getCover
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

function generateInput(value) {
  let ageInput = document.getElementById('ageInput')
  if (ageInput != null) ageInput.remove()

  let chooseInput = [
    `I'm <input name="your" id="meAge" type="text"> years old`,
    `I'm <input name="your" id="meAge" type="text"> years old and my spouse is <input name="spouse" id="spouseAge" type="text">`,
    `I'm <input name="your" id="meAge" type="text"> years old and my spouse is <input name="spouse" id="spouseAge" type="text"> and my <select id="kidSelect"></select> <span id="replaceText">kid is</span>`,
    `I'm <input name="your" id="meAge" type="text"> years old and my <select id="kidSelect"></select> <span id="replaceText">kid is</span>`
  ]

  let paragraph = document.createElement('p')
  let span = document.createElement('span')
  paragraph.id = `ageInput`

  span.innerHTML = chooseInput[value-1]

  paragraph.append(span)

  let errors = generateInitialError(paragraph)

  return {
    value: paragraph,
    errors: errors
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
        const {value, errors} = generateInput(e.target.selectedIndex)
        newContainer.append(value)
        let err = putError(errors, 'age')
        value.after(err)
        

      })

    }
  })
}

//start
form()




/*(function() {
  let inputZip = document.getElementById('zipcode')
  let container = document.getElementById('container')
  let newContainer = document.getElementById('continue-container')
  let containerCont = false
  let errCodes = [
    `Unfortunately there is no ZIP code like that in makati`,
    `ZIP code must be 4 digits`,
    `Hey youngster, you have to be 18 or older to sign up with Oscar`,
    `Your spouse needs to be at least 18 years old`,
    `Your age is required to get a quote`,
    `Your spouse’s age is required to get a quote`,
    `All ages are required to get a quote`
  ]
  let options = ['', 'me', 'me and my spouse', 'me, my spouse and kids', 'me and my kids']
  const zipcodes = ["1226","1233","1209","1214","1217","1221","1222","1219","1220","1202","1201","1228","1212","1211","1206","1204","1229","1232","1224","1200","1207","1235","1231","1218","1213","1230","1210","1216","1215","1227","1203","1234","1223","1205","1225","1208"]

  let childrenInput = (num) => {
    let par = document.createElement('span')
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
    return par
  }

  let validateNumbersOnly = (e) => {
    if (!e.key.match(/([0-9])/g)) e.preventDefault()
  }

  let validateZipCodeLength = (e) => {
    if(e.target.value.length > 3) e.preventDefault()
  }

  let validateZipCode = (e) => {
    let error = []
    const {value} = e.target

    if(!zipcodes.includes(value)) {
      error.push(errCodes[0])
    }

    if(value.length <= 3) {
      error.push(errCodes[1]) 
    }

    return error
  }

  let validateAge = (e) => {
    const {name, value} = e.target
    let error = []

    if(value < 18) {
      if(name === 'your') {
        error.push(errCodes[2])
      } else if(name === 'spouse') {
        error.push(errCodes[3])
      }
    }
    return error
  }

  let putError = (errors, sibling) => {
    let errCont = document.getElementsByClassName(`error-${sibling}`)
    if(errCont.length > 0) {
      for(err of errCont) {
        err.remove()
      }
    }

    let errUl = document.createElement('ul')
    errUl.className += `error-${sibling} error`

    if(errors.length > 0) {
      errors.map((err) => {
        let li = document.createElement('li')
        li.innerHTML = err
        errUl.append(li)
      })

      return errUl
    }

    return false
  }

  let validateRequired = (e) => {
    let err = ''
    if(e.target.value == '') {
      err = `All age is requried.`
    }

    return err
  }
  
  //start
  inputZip.addEventListener('keypress', (e) => {
    validateNumbersOnly(e)
    validateZipCodeLength(e)
  })

  inputZip.addEventListener('keyup', (e) => {
    let errors = validateZipCode(e)
    let setErrors = putError(errors, 'zip')
    if(setErrors) {
      inputZip.after(setErrors)
    }

    if(zipcodes.includes(e.target.value) && containerCont === false) {
      containerCont = true
      let selectBox = document.createElement('select')
      let paragraph = document.createElement('p')
      paragraph.innerHTML = `<span>I'd like to cover</span>`

      let selectOptions = options.map((option, index) => {
        let opt = document.createElement('option')

        if (index === 0) {
          opt.disabled = true
          opt.selected = true
        }

        opt.value = index
        opt.innerHTML = option
        return opt
      })

      selectOptions.map((option) => {
        selectBox.append(option)
      }).reverse()

      paragraph.append(selectBox)
      newContainer.append(paragraph)

      selectBox.addEventListener('change', (e) => {
        let errors = []
        const { value } = e.target
        let ageSelect = document.getElementById('ageSelect')
        if(ageSelect != null) newContainer.removeChild(ageSelect)
        let paragraph = document.createElement('p')
        paragraph.id = 'ageSelect'


        if(value == 1) {
          paragraph.innerHTML = `I'm <input name="your" id="meAge" type="text"> years old`
        } else if (value == 2) {
          paragraph.innerHTML = `I'm <input name="your" id="meAge" type="text"> years old and my spouse is <input name="spouse" id="spouseAge" type="text">`
        } else if (value == 3) {
          paragraph.innerHTML = `I'm <input name="your" id="meAge" type="text"> 
                                  years old and my spouse is <input name="spouse" id="spouseAge" type="text"> 
                                  and my <select id="kidSelect"></select> <span id="replaceText">kid is</span>`
        } else if (value == 4) {
          paragraph.innerHTML = `I'm <input name="your" id="meAge" type="text"> 
                                  years old and my <select id="kidSelect"></select> <span id="replaceText">kid is</span>`
        }

        newContainer.append(paragraph)

        let myAge = document.getElementById('meAge')
        let spouseAge = document.getElementById('spouseAge')
        let kidSelect = document.getElementById('kidSelect')

        if(myAge.value === '') {
          errors.push(errCodes[4])

          myAge.addEventListener('keypress', (event) => {
            validateNumbersOnly(event)
            validateZipCodeLength(event)
          })

          myAge.addEventListener('change', (event) => {
            let errors = validateAge(event)
            let setError =  putError(errors, 'age')
            if(setError) {
              ageSelect.after(setError)
            } else {
              let newParagraph = document.createElement('p')
              newParagraph.innerHTML = `I make $ <input id="inputMoney" type="text"> yearly with <select id="taxPerson"></select> <span class="changeText">person</span> in my tax household.`
              newContainer.append(newParagraph)
              let taxPerson = document.getElementById('taxPerson')


              for(let i = 0; i < 9; i++) {
                let op = document.createElement('option')
                op.value = i
                op.innerHTML = i

                if(i === 0) {
                  op.value = i
                  op.disabled = true
                  op.innerHTML = ''
                  op.selected = true
                }

                if(i === 8) {
                  op.innerHTML = `${i}+`
                }

                taxPerson.append(op)
              }
            }
          })
        }

        if(spouseAge != null) {
          if(spouseAge.value === '') {
            errors.push(errCodes[5])
          }

          spouseAge.addEventListener('keypress', (event) => {
            validateNumbersOnly(event)
            validateZipCodeLength(event)
          })
        }

        if(kidSelect != null) {

          errors.push(errCodes[6])

          for(let i = 0; i < 10; i++) {
            let opt = document.createElement('option')
            opt.value = i
            opt.innerHTML = i

            if(i === 0) {
              opt.value = i
              opt.innerHTML = ''
              opt.disabled = true
              opt.selected = true
            }
            kidSelect.append(opt)
          }

          kidSelect.addEventListener('change', (e) => {
            const {value} = e.target
            let kidsAgeContainer = document.getElementById('kidsAgeContainer')
            let replaceText = document.getElementById('replaceText')
            let ageSelect = document.getElementById('ageSelect')

            if(kidsAgeContainer != null) ageSelect.removeChild(kidsAgeContainer)

            if (value < 2) {
              replaceText.innerHTML = 'kid is'
            } else {
              replaceText.innerHTML = 'kid are'
            }
            replaceText.after(childrenInput(value))

            let kidsInput = document.getElementsByClassName('kidsAge')

            for(kidInput of kidsInput) {
              kidInput.addEventListener('keypress', (e) => {
                validateNumbersOnly(e)
                validateZipCodeLength(e)
              })
            }
          })
        }

        ageSelect = document.getElementById('ageSelect')
        let setError =  putError(errors, 'age')
        if(setError) {
          ageSelect.after(setError)
        } else {
          ageSelect.after('')
        }
      })
    }
  })
  
})()*/