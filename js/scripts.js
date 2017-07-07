(function() {
  
  let inputZip = document.getElementById('zipcode')
  let container = document.getElementById('continue-container')
  let containerCont = false

  let needInput = (num) => {
    let par = ''
    if(num == 1) {
      par += `kid is <input id="kidAge1" type="text">.`
    } else if (num == 2) {
      par += `kids are <input id="kidAge1" type="text"> and <input id="kidAge2" type="text">.`
    } else {
      par = 'kids are'
      for(let i = 1; i <= num; i++) {
        if(i < (num-1) ) {
          par += `<input id="kidAge${i}" type="text">,`
        } else if (i == (num-1)) {
          par += `<input id="kidAge${i}" type="text">, and`
        } else if (i == num) {
          par += `<input id="kidAge${i}" type="text">.`
        }

      }
    }

    return par
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
        paragraph = document.createElement('p')

        if(value == 1) {
          paragraph.innerHTML = `I'm <input id="meAge" type="text"> years old`
        } else if (value == 2) {
          paragraph.innerHTML = `I'm <input id="meAge" type="text"> years old and my spouse is <input id="spouseAge" type="text">`
        } else if (value == 3) {
          paragraph.innerHTML = `I'm <input id="meAge" type="text"> 
                                  years old and my spouse is <input id="spouseAge" type="text"> 
                                  and my <select id="kidSelect"></select> kid is`
        } else if (value == 4) {
          paragraph.innerHTML = `I'm <input id="meAge" type="text"> 
                                  years old and my <select id="kidSelect"></select> kid is`
        }
        container.append(paragraph)

        let kidSelect = document.getElementById('kidSelect')
        for(let i = 0; i < 11; i++) {
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
          let defaultPar = paragraph.innerHTML
          paragraph.innerHTML = defaultPar.substr(0, defaultPar.length-6)
          paragraph.innerHTML += needInput(e.target.value)
        })

      })
    }
  })
  
})()