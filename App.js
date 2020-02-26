 import React,{Component,createRef} from 'react';
import './App.css';
import Nama from './component/nama'
import {Table,Modal,ModalBody,ModalHeader,ModalFooter,Button} from 'reactstrap'
import Notfound from './component/notfound'
// Start hari ke -6
class App extends Component{     //ini Anaknya, Parentnya App
  state = { //data-data bisa ubah di ste
    murid:[],
    modalopen:false,
    inputnama:createRef(),
    inputusia:'',


    modaldelete:false,
    deleteselect:-1,

    modaledit:false,
    editselect:0 //biar gak bikin ternary
  }
  componentDidMount(){
    console.log('inididmount')
    var isidata=[
      {
        nama:'Angga',
        umur: 25
      },
      {
        nama:'Sophia',
        umur: 21
      },
      {
        nama:'Putri',
        umur: 23
      }
    ]
    this.setState({murid:isidata})
  }
  componentDidUpdate(){
    console.log('ini did update')
  }
  capitalfirst=(input)=>{
    const upper = input.charAt(0).toUpperCase() +input.substring(1);
    return upper
  }
  onAddButtonClick=()=>{
    var nama=this.state.inputnama.current.value //pakai create rev
    var usia=parseInt(this.state.inputusia) //pakai onChange
    var muridbaru=this.state.murid
    muridbaru.push({nama:nama, umur:usia})
    this.state.inputnama.current.value=''
    this.setState({murid:muridbaru,inputusia:''})
  }

  rendernamamurid=()=>{
   return this.state.murid.map((val,index)=>{           //Tak bisa pakai const
      return (
        <Nama containerstyle={{marginBottom:20}} key={index}>
        <div>
          <span style={{fontWeight:'bolder'}}>Nama</span> &nbsp;:{this.capitalfirst(val.nama)}
        </div>
        <div>
          <span style={{fontWeight:'bolder'}}>Usia</span> &nbsp;:{val.umur}
        </div>
        </Nama>
        )
  })
}  
//Key digunakan biar tahu perbedaan komponennya
  rendernamamuridtable=()=>{
    //cara lama
    //var render = this.state.murid.map((val,index)=>{
    return this.state.murid.map((val,index)=>{
      return(
        <tr key={index}>   
          <td>{index+1}</td>
          <td>{val.nama}</td>
          <td>{val.umur}</td>
          <td>
            <button className='btn btn-primary' onClick={()=>this.onBtnEditClick(index)}>Edit</button>
            <button className='btn btn-danger' onClick={()=>this.onBtnDeleteClick(index)}>Delete</button>
          </td>
        </tr>
      )
    })
    //return render
  }

//Untuk modal

onBtnDeleteClick=(index)=>{
  this.setState({modaldelete:!this.state.modaldelete,deleteselect:index})
}
onBtnEditClick=(index)=>{
  this.setState({modaledit:!this.state.modaledit,editselect:index})
}
onBtnyesdeleteClick=()=>{
  var datamurid=this.state.murid
  datamurid.splice(this.state.deleteselect,1)
  this.setState({murid:datamurid, modaldelete: false})
}
onBtnupdateClick=()=>{
  var editnama=this.refs.editnama.value
  var editumur=this.refs.editumur.value
  var datamurid=this.state.murid
  //cara 1
  // datamurid[this.state.editselect].nama=editnama
  // datamurid[this.state.editselect].umur=editumur
  //cara 2: Spread

  datamurid[this.state.editselect]={...datamurid[this.state.editselect],nama:editnama,umur:editumur}
  this.setState({murid:datamurid, modaledit:false})
}
btntoggle=()=>{
  this.setState({modalopen:!this.state.modalopen})
}
btntoggledelete=()=>{
  this.setState({modaldelete:!this.state.modaldelete})
}
btntoggleedit=()=>{
  this.setState({modaledit:!this.state.modaledit})
}
  render(){     //props=namagua
    if(this.state.murid.length===0){
      return(
        <div>
          {/* <Notfound/> */}
        </div>
      )
    }
    return (
    <div className='tengah'style={{height:'99vh'}}>
      <Modal isOpen={this.state.modalopen} toggle={this.btntoggle}>
        <ModalHeader toggle={this.btntoggle}>Add data</ModalHeader>
        {/* toggle yg modalheder ada tanda x di samping kanan */}
        <ModalBody>
          lorem itsumdslafkjdfalksjaslkj
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary'>Add data</button>
          <button className='btn btn-danger' onClick={this.btntoggle}>Cancel</button>
          {/* <button>Cancel</button> */}
        </ModalFooter>

      </Modal>
      {
        this.state.deleteselect<0? null:  //dalam return tak blh ada if jadi pakai ternary

        <Modal isOpen={this.state.modaldelete} toggle={this.btntoggledelete}  >
        {/* toggle yg modalheder ada tanda x di samping kanan */}
        <ModalHeader toggle={this.btntoggledelete}>Delete data</ModalHeader>
        <ModalBody>
          Yakin mau hapus data dengan nama murid <span style={{color:'orange',fontWeight:'bolder'}}>{this.state.murid[this.state.deleteselect].nama}</span> 
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={this.onBtnyesdeleteClick} >Yes</button>
          <button className='btn btn-primary' onClick={this.btntoggledelete}>No</button>
          {/* <button>Cancel</button> */}
        </ModalFooter>
      </Modal>
      }

      <Modal isOpen={this.state.modaledit} toggle={this.btntoggleedit}>
        {/* toggle yg modalheder ada tanda x di samping kanan */}
        <ModalHeader toggle={this.btntoggleedit}>Edit Data {this.state.murid[this.state.editselect].nama}</ModalHeader>
        <ModalBody>
            <input type='text' className='form-control' ref='editnama' defaultValue={this.state.murid[this.state.editselect].nama}></input>
            <input type='number' className='form-control' ref='editumur' defaultValue={this.state.murid[this.state.editselect].umur}></input>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary'onClick={this.onBtnupdateClick}>Update data</button>
          <button className='btn btn-danger' onClick={this.btntoggleedit}>Cancel</button>
          {/* <button>Cancel</button> */}
        </ModalFooter>
      </Modal>
      
      
      {/* Kalau ada onclick, karn statenya false, dia jd true */}
      <Table striped style={{width:'50%'}}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Umur</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            this.rendernamamuridtable()
          }
        </tbody>
      </Table>
      <button className='btn btn-success' onClick={()=>this.setState({modalopen:!this.state.modalopen})}>Add data</button>

      {
        this.rendernamamurid()
      }



      {/* Start cara lama */}
      {/* <input type='text'className='mb-2'placeholder='masukkan nama' ref={this.state.inputnama}></input>
      <input
        type='number'
        placeholder='masukkan usia'
        value={this.state.inputusia}
        onChange={(event)=>this.setState({inputusia:event.target.value})}></input>

      <button onClick={this.onAddButtonClick} className='btn btn-primary'>
        add
      </button> */}
      {/* End cara lama */}

      </div>
    );
  }
}

      {/* Start pengenalan dengan Function */}

// function App() {    //Disebutjuga componen
//   return (    //return JsX  Hanya bisa 1 komponen (1div, parents)
//     <div className='tengah'style={{height:'99vh'}}>
//       {
//       }    
//     // <Nama namagua={'Angga'}/>
//     // <Nama namagua={'Putri'}/>
//     // <Nama namagua={'Sofia'}/>
//     // <Nama namagua={'Indo'}/>
//     // </div>
 
//   );
// }
export default App;

