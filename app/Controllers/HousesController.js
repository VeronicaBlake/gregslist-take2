import { ProxyState } from "../AppState.js";
import { housesService } from "../Services/HousesServices.js";


//Private
function _draw() {
  let houses = ProxyState.houses
  let template = ''
  houses.forEach(house => {
    template += house.Template
  })
  document.getElementById('houses').innerHTML = template
}

//Public
export default class HousesController {
  constructor() {
    ProxyState.on('houses', _draw);

    // REVIEW
    // GET Houses ON LOAD - this is calling the async getHouses
    this.getHouses()
  }

  async getHouses() {
    try {
      await housesService.getHouses() //this is waiting for getHouse from HousesService 
    } catch (error) {
      console.error(error)
    }
  }

  async createHouse() { 
    try {
      window.event.preventDefault() //preventDefault just keeps you from being taken to a different page
      const form = window.event.target //IDK about the window.event stuff
      let newHouse = {
        // @ts-ignore
        bedrooms: form.bedrooms.value,
        // @ts-ignore
        bathrooms: form.bathrooms.value,
        // @ts-ignore
        levels: form.levels.value,
        // @ts-ignore
        year: form.year.value,
        // @ts-ignore  this converts the string to a number
        price: Number(form.price.value),
        // @ts-ignore
        description: form.description.value,
        // @ts-ignore
        imgUrl: form.imgUrl.value
      }
      await housesService.createHouse(newHouse)

      // @ts-ignore
      form.reset()

      $('#new-car-form').modal('hide')
    } catch (error) {
      console.error(error)
    }
  }

  deleteHouse(id) {
    try {
      housesService.deleteHouse(id)
    } catch (error) {
      console.error(error)
    }
  }

  bid(id) {
    housesService.bid(id)
  }

}