let periods = 0
let timeid = 0
let run = false

const positions = [
    [-1,-1],
    [0,-1],
    [1,-1],
    [1,0],
    [1,1],
    [0,1],
    [-1,1],
    [-1,0],
]

let main = document.getElementById("main");
let div;

let period_button = document.getElementById("period")
let timeout_button = document.getElementById("timeout")
let test_button = document.getElementById("test")
let count = document.getElementById("count")
let speedInput = document.querySelector("#speed")
let wantedInput = document.querySelector("#wanted") 

let speed = speedInput.value
let wanted = wantedInput.value

period_button.addEventListener("click", periode)
timeout_button.addEventListener("click",()=>{timeout(false)})
test_button.addEventListener("click", test)

count.innerHTML = periods
let cells = []
let mainx = main.offsetWidth // || main.style.width
let mainy = main.offsetHeight // || main.style.height

let cellCote = Math.floor(mainx/wanted - 2)
console.log(cellCote)

speedInput.addEventListener("change",() => {
    speed = speedInput.value
    console.log(speed)
    timeout(true)
    timeout()
})
wantedInput.addEventListener("change",() => {
    wanted = wantedInput.value
    mainx = main.offsetWidth // || main.style.width
    mainy = main.offsetHeight // || main.style.height

    cellCote = mainx/wanted - 2
    cells = fresh()

    base(wanted,cellCote)
    refresh()

})


function base(wanted,cellCote){

    for (let x = 0;x < wanted; x++){
        cells.push([])
        for (let y=0; y < wanted; y++){
            cells[x].push(0)
        }
    }
    
    for (let x = 0;x < wanted; x++){
        for (let y=0; y < wanted; y++){
            div = document.createElement('div');
            div.classList.add("cell")
            div.style.width = cellCote.toString() + "px"
            div.style.height = cellCote.toString() + "px"
            div.life = false
            div.x = x
            div.y = y
            
            
            div.addEventListener("click", function (){
                this.life = !this.life
                timeout(true)
                refresh()
            })
            
            cells[x][y] = div
            main.append(div)
        }
    }
    console.log(cells)

}

base(wanted,cellCote)
refresh()

function timeout(stop = false){
    if (!run && !stop){
        timeid = setInterval(periode,1000-speed)
        timeout_button.innerHTML = "Arrêter"
        run = true
    } else {
        console.log('salut')
        clearInterval(timeid)
        timeout_button.innerHTML = "Timeout"
        run = false
    }
}


function periode(){
    cells.forEach(x => {
            x.forEach(cell => {
                deleteOrNo(cell)
        })
    })
    periods++
    count.innerHTML = periods
    refresh()
}


function refresh(){
    cells.forEach(x => {
            x.forEach(cell => {
            if (cell.life){
                cell.classList.remove('dead')
                cell.classList.add('life')
            } else {
                cell.classList.remove("life")
                cell.classList.add("dead")
            }
        })
    })
}
function getNeighbours(cell){
    let x = cell.x
    let y = cell.y

    let neighbours = []
    
    positions.forEach(neigh => {
        if (cells[x+neigh[0]] == undefined){
            
        }
        else if (cells[x+neigh[0]][y+neigh[1]] == undefined) {

        }
        else {
            if (cells[x+neigh[0]][y+neigh[1]].classList.contains("life")){
                neighbours.push(cells[x+neigh[0]][y+neigh[1]])
            }
        }
    })
    return neighbours.length
}



function deleteOrNo(cell){
    
    if (cell.life){
        if (getNeighbours(cell) == 2 || getNeighbours(cell) == 3){
            cell.life = true
        } else {
            cell.life = false
        }
    }
    else if (!cell.life){
        if (getNeighbours(cell) == 3){
            cell.life = true
        } else {
            cell.life = false
        }
    }
}

function fresh(){
    cells.forEach((x)=>{
        x.forEach(cell=> cell.remove() )
    })
    cells = []
    return cells
}