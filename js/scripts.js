(function() {
  
  let inputZip = document.getElementById('zipcode')
  let container = document.getElementById('continue-container')
  let containerCont = false

  let needInput = (num) => {
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

  let validateInput = (e) => {

  }

  let validationAge18 = (e) => {

  }

  let validateRequired = (e) => {
    
  }
  
  //start
  inputZip.addEventListener('keyup', (e) => {
    
    if(e.target.value === '12345' && containerCont === false)  {
      containerCont = true
      let selectBox = document.createElement('select')
      let paragraph = document.createElement('p')
      paragraph.innerHTML = `<span>I'd like to cover</span>`

      let options = ['', 'me', 'me and my spouse', 'me, my spouse and kids', 'me and my kids']
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

      selectBox.append(selectOptions)
      paragraph.append(selectBox)
      container.append(paragraph)

      selectBox.addEventListener('change', (e) => {
        const { value } = e.target
        let ageSelect = document.getElementById('ageSelect')
        if(ageSelect != null) container.removeChild(ageSelect)
        let paragraph = document.createElement('p')
        paragraph.id = 'ageSelect'


        if(value == 1) {
          paragraph.innerHTML = `I'm <input id="meAge" type="text"> years old`
        } else if (value == 2) {
          paragraph.innerHTML = `I'm <input id="meAge" type="text"> years old and my spouse is <input id="spouseAge" type="text">`
        } else if (value == 3) {
          paragraph.innerHTML = `I'm <input id="meAge" type="text"> 
                                  years old and my spouse is <input id="spouseAge" type="text"> 
                                  and my <select id="kidSelect"></select> <span id="replaceText">kid is</span>`
        } else if (value == 4) {
          paragraph.innerHTML = `I'm <input id="meAge" type="text"> 
                                  years old and my <select id="kidSelect"></select> <span id="replaceText">kid is</span>`
        }
        container.append(paragraph)

        let kidSelect = document.getElementById('kidSelect')
        if(kidSelect != null) {
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
            replaceText.after(needInput(value))
          })
        }

      })
    }
  })
  
})()