// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]
getId()
export default function App() {
  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)
  const [values, setValues] = useState({
    id: id,
    fname: '',
    lname: '',
    bio: '',
    
  })
  // ✨ Create a third state to track the values of the inputs

  useEffect(() => {

    console.log(editing)
     
    members.map( mem => {
      if(mem.id == editing){
      setValues(mem)
    }
    }) 
    // ✨ If the `editing` state changes from null to the number 2 (for example)
    // this means we need to populate the inputs of the form
    // with the data belonging to the member with id 2.
    // On the other hand, if the `editing` state changes back to null
    // then we need to reset the form back to empty values
  }, [editing])

  const onChange = evt => {
    const{name, value} = evt.target
    
    setValues({
      ...values,
      [name]: value,
       
      
    })
    
    // ✨ This is the change handler for your text inputs and your textarea.
    // You can check `evt.target.id` to know which input changed
    // and then you can use `evt.target.value` to update the state of the form
  }
  const edit = id => {
    setEditing(id.target.id)
    
    
    // ✨ Put this function inside a click handler for the <button>Edit</button>.
    // It should change the value of `editing` state to be the id of the member
    // whose Edit button was clicked
  }
  const submitNewMember = () => {
    setValues({
      ...values,
      id: getId()
    })
    setMembers(members.concat(values))
    console.log(values)
    console.log(members)
    setValues({
      id: id,
      fname: '',
      lname: '',
      bio: '',
      
    })
    
    // This takes the values of the form and constructs a new member object,
    // which is then concatenated at the end of the `members` state
  }
  const editExistingMember = () => {

    setMembers( members.map( mem => {
      
      if(mem.id == editing){
      mem = {
        ...values,
        
      }
      
    }
    console.log(mem)
    return {...mem}
    })
  )

 
    setEditing(null)
    setValues({
      id: id,
      fname: '',
      lname: '',
      bio: '',
      
    })
    // ✨ This takes the values of the form and replaces the data of the
    // member in the `members` state whose id matches the `editing` state
  }
  const onSubmit = evt => {
    evt.preventDefault()

    editing ? editExistingMember() : submitNewMember();
    
    // ✨ This is the submit handler for your form element.
    // It will call either `submitNewMember` or `editExistingMember`
    // depending on whether the `editing` state is null or has an id in it.
    // Don't allow the page to reload! Prevent the default behavior
    // and clean up the form after submitting
  }
  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                <button id={mem.id} onClick={edit}>Edit</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>

          <div>           {/*  firstname */}
            <label htmlFor="fname">First Name </label>
            <input 
            onChange={onChange}
            id="fname" 
            name='fname'
            type="text" 
            placeholder="Type First Name"
            value={values.fname}
            
            />
          </div>

          <div>           {/*  lastname */}
            <label htmlFor="lname">Last Name </label>
            <input 
            onChange={onChange}
            id="lname" 
            name='lname'
            type="text" 
            placeholder="Type Last Name"
            value={values.lname}
            />
          </div>

          <div>           {/*  bio */}
            <label htmlFor="bio">Bio </label>
            <textarea 
            onChange={onChange}
            id="bio" 
            name='bio'
            placeholder="Type Bio" 
            value={values.bio}
            />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
