export default class Student {

  constructor(data) {

    Object.assign(this, data);

  }

  static async load(id){
    let res = await fetch(`/api/students/${id}`);//promise
    let data = await res.json();//promise
    return new Student(data);
  }
}
