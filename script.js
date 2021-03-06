var solidHourColor = '#ff0000'
var auxiliaryHourColor = '#ffff00'

var solidMinuteColor = '#ff0000'
var auxiliaryMinuteColor = '#ffff00'

var solidSecondColor = '#ff0000'
var auxiliarySecondColor = '#ffff00'

var noneColor = '#ffffff'
var strokeColor = '#000000'
var outerRingRadius = 200
var centerPosition = {
  x: 210,
  y: 210
}
const canvas = document.getElementById('beauty-clock');
const ctx = canvas.getContext('2d')
ctx.canvas.width = 420;
ctx.canvas.height = 420;

let shcp, ahcp, smcp, amcp, sscp, ascp, strCol, nonCol;


shcp = document.querySelector('#solidHourColorPicker')
shcp.value = solidHourColor
shcp.addEventListener('input', (event) => {
  solidHourColor = event.target.value
}, false)
ahcp = document.querySelector('#auxiliaryHourColorPicker')
ahcp.value = auxiliaryHourColor
ahcp.addEventListener('input', (event) => {
  auxiliaryHourColor = event.target.value
}, false)
smcp = document.querySelector('#solidMinuteColorPicker')
smcp.value = solidMinuteColor
smcp.addEventListener('input', (event) => {
  solidMinuteColor = event.target.value
}, false)
amcp = document.querySelector('#auxiliaryMinuteColorPicker')
amcp.value = auxiliaryMinuteColor
amcp.addEventListener('input', (event) => {
  auxiliaryMinuteColor = event.target.value
}, false)
sscp = document.querySelector('#solidSecondColorPicker')
sscp.value = solidSecondColor
sscp.addEventListener('input', (event) => {
  solidSecondColor = event.target.value
}, false)
ascp = document.querySelector('#auxiliarySecondColorPicker')
ascp.value = auxiliarySecondColor
ascp.addEventListener('input', (event) => {
  auxiliarySecondColor = event.target.value
}, false)
strCol = document.querySelector('#strokeColorPicker')
strCol.value = strokeColor
strCol.addEventListener('input', (event) => {
  strokeColor = event.target.value
}, false)
nonCol = document.querySelector('#noneColorPicker')
nonCol.value = noneColor
nonCol.addEventListener('input', (event) => {
  noneColor = event.target.value
}, false)


sSectors = [undefined, undefined, undefined, undefined, undefined, undefined]
mSectors = [undefined, undefined, undefined, undefined, undefined, undefined]
hSectors = [undefined, undefined, undefined, undefined]
hZones = {
  0: [11, 0, 1],
  3: [2, 3, 4],
  6: [5, 6, 7],
  9: [8, 9, 10]
}

class sSector {
  constructor() {
    this.type = 'second'
    this.x = centerPosition.x //absolute
    this.y = centerPosition.y
    this.radius = outerRingRadius
    this.color = noneColor
    this.sectorStart = Math.PI * (-2 / 3)
    this.sectorEnd = Math.PI / -3
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, this.sectorStart, this.sectorEnd, false);
    ctx.closePath();
    ctx.fillStyle = this.color
    ctx.fill();
    ctx.strokeStyle = strokeColor
    ctx.stroke()
  }
  setColor(newColor, toDraw = true) {
    this.color = newColor
    if (toDraw) {
      this.draw()
    }
  }
}

class mSector {
  constructor() {
    this.type = 'minute'
    this.x = centerPosition.x //absolute
    this.y = centerPosition.y
    this.radius = outerRingRadius * 2 / 3
    this.color = noneColor
    this.sectorStart = Math.PI * (-2 / 3)
    this.sectorEnd = Math.PI * (-1 / 3)
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, this.sectorStart, this.sectorEnd, false);
    ctx.closePath();
    ctx.fillStyle = this.color
    ctx.fill();
    ctx.strokeStyle = strokeColor
    ctx.stroke()
  }
  setColor(newColor, toDraw = false) {
    this.color = newColor
    if (toDraw) {
      this.draw()
    }
  }
}

class hSector {
  constructor() {
    this.x = centerPosition.x //absolute
    this.y = centerPosition.y
    this.radius = outerRingRadius / 3
    this.color = noneColor
    this.sectorStart = Math.PI * (-3 / 4)
    this.sectorEnd = Math.PI / -4
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, this.sectorStart, this.sectorEnd, false);
    ctx.closePath();
    ctx.fillStyle = this.color
    ctx.fill();
    ctx.strokeStyle = strokeColor
    ctx.stroke()
  }
  setColor(newColor, toDraw = true) {
    this.color = newColor
    if (toDraw) {
      this.draw()
    }
  }
}


sSectors = sSectors.map((element, index, array) => {
  if (index == 0) {
    return new sSector
  } else {
    element = new sSector
    element.sectorStart = Math.PI * (-2 / 3) + (Math.PI / 3 * index)
    element.sectorEnd = element.sectorStart + (Math.PI / 3)
    return element
  }
})

mSectors = mSectors.map((element, index, array) => {
  if (index == 0) {
    return new mSector
  } else {
    element = new mSector
    element.sectorStart = Math.PI * (-2 / 3) + (Math.PI / 3 * index)
    element.sectorEnd = element.sectorStart + (Math.PI / 3)
    return element
  }
})

hSectors = hSectors.map((element, index, array) => {
  if (index == 0) {
    return new hSector
  } else {
    element = new hSector
    element.sectorStart = Math.PI * (-3 / 4) + (Math.PI / 2 * index)
    element.sectorEnd = element.sectorStart + (Math.PI / 2)
    return element
  }
})

function drawAllClock() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  sSectors.map((element, index, array) => {
    element.draw()
    element.color = noneColor
  })
  mSectors.map((element, index, array) => {
    element.draw()
    element.color = noneColor
  })
  hSectors.map((element, index, array) => {
    element.draw()
    element.color = noneColor
  })
}


// convertor

function setHourColors(hour) {
  for (zone in hZones) {
    if (hZones[zone].includes(hour)) {
      let solidHour = hZones[zone][1]
      let auxiliaryHour = hour - solidHour
      hSectors[solidHour / 3].setColor(solidHourColor, false)
      if (auxiliaryHour != 0) {
        let bar = solidHour / 3 + auxiliaryHour;
        if (bar == 4) {
          bar = 0
        } else if (auxiliaryHour == 11) {
          bar = 3
        }
        hSectors[bar].setColor(auxiliaryHourColor, false)
      }
      break
    }
  }
}

function setOuterRings(m10, m01, sectors) {
  if (m01 != 0) {
    if (m01 % 2 == 1) {
      m01 = m10 + ((m01 + 1) / 2)
      if (m01 >= 6) {
        m01 -= 6
      }

    } else if (m01 % 2 == 0) {
      m01 = m10 + (m01 / 2)
      let m01plus = m01 + 1
      if (m01 >= 6) {
        m01 -= 6
      }
      if (m01plus >= 6) {
        m01plus -= 6
      }
      if (sectors[0].type == 'second') {
        sectors[m01plus].setColor(auxiliarySecondColor, false)
      } else if (sectors[0].type == 'minute') {
        sectors[m01plus].setColor(auxiliaryMinuteColor, false)
      }
    }
    if (sectors[0].type == 'second') {
      sectors[m10].setColor(solidSecondColor, false)
      sectors[m01].setColor(auxiliarySecondColor, false)
    } else if (sectors[0].type == 'minute') {
      sectors[m10].setColor(solidMinuteColor, false)
      sectors[m01].setColor(auxiliaryMinuteColor, false)
    }
  }
}


function main_tick() {
  let now = new Date(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hour = now.getHours()

  hour = hour >= 12 ? hour - 12 : hour

  let timeNumbers = {
    hour: hour,
    minLeft: (now.getMinutes() - (now.getMinutes() % 10)) / 10,
    minRight: now.getMinutes() % 10,
    secLeft: (now.getSeconds() - (now.getSeconds() % 10)) / 10,
    secRight: now.getSeconds() % 10
  }
  setHourColors(timeNumbers.hour)
  setOuterRings(timeNumbers.minLeft, timeNumbers.minRight, mSectors)
  setOuterRings(timeNumbers.secLeft, timeNumbers.secRight, sSectors)
  drawAllClock()
}


// main_tick()
setInterval(() => {
  main_tick()
}, 1000)
