
import { useState,useEffect, useRef } from 'react';

import{Row,Col,Form,Card,Button,Container} from 'react-bootstrap'
import axios from 'axios';


const ExpenseForm = (props) => {
  // const [length,Setlength]=useState(false);
  const [enteredData, setEnteredData] = useState([]);

  const ExpenseAmount = useRef();
  const ExpenseDisc = useRef();
  const ExpenseCat = useRef();

  async function getData() {
    let res = await axios.get('https://ecommerce-186d4-default-rtdb.firebaseio.com/expenseItems.json');

    const data = await res.data;

    console.log("INSIDE useEffect", data);

    setEnteredData(data || []);
  }

  useEffect(() => {
    getData();
  }, []);

  async function SubmitHandler(event) {
    event.preventDefault();
    let enteredamount = ExpenseAmount.current.value;
    let entereddisc = ExpenseDisc.current.value;
    let enteredcate = ExpenseCat.current.value;

    const obj = {
      amount: enteredamount,
      disc: entereddisc,
      cate: enteredcate
    }

    let res = await axios.post('https://ecommerce-186d4-default-rtdb.firebaseio.com/expenseItems.json', obj);
    let data = await res.data;
    console.log("DATA FINDING", data)

    getData();
  }

  async function onDeleteClickHandler(id) {
    const res = await axios.delete(`https://ecommerce-186d4-default-rtdb.firebaseio.com/expenseItems/${id}.json`);
    const data = await res.data;
    console.log("Successfully Deleted");
    getData();
  }

  const onEditExpenseClickHandler = (expenseId) => {
    ExpenseAmount.current.value = enteredData[expenseId].amount;
    ExpenseDisc.current.value = enteredData[expenseId].disc;
    ExpenseCat.current.value = enteredData[expenseId].cate;

    onDeleteClickHandler(expenseId);
    getData();
  }

return (
    <>
     <Row style={{margin:"2% 0  0  3%"}}>
            <Col md={6}>
                <Card>
                    <Card.Header className="p-1" style={{backgroundColor:"darkGrey",textAlign:"center"}}>
                    <h4 >Expense-Form</h4>
                    </Card.Header>

                    <Card.Body className="p-2" style={{backgroundColor:"#f7f5f0"}}>
                    <Form>

                   

                        <Form.Group   className="mb-1">
                            <Form.Control size="lg" type="number" placeholder="amount" name="amount" ref={ExpenseAmount}  ></Form.Control>
                            </Form.Group>
                         <Form.Group className="mb-2">
                            <Form.Control size="lg" type="text" placeholder="discription" name="discription"  ref={ExpenseDisc}></Form.Control>
                             </Form.Group>

                             
                         <Form.Group className="mb-1">
                          <Form.Label style={{fontWeight:"bold",marginRight:"30px"}}>Category</Form.Label>

                            <select ref={ExpenseCat} style={{width:"80%"}} >
                                <option>Food</option>
                                <option>Sports</option>
                                <option>Salary</option>
                                <option>Travelling</option>
                                <option>Study</option>
                                <option>House Keeping</option>
                            </select>
                        </Form.Group>
                                
                         
               
                        <Form.Group className="mb-1">
                        <Container  style={{textAlign:"center"}}>
                         <Button  size='lg' variant="success"  type="submit"  style={{borderRadius:"40px"}} onClick={SubmitHandler}>Submit</Button>
                          </Container>

                        </Form.Group>
                      
                    </Form>
                   </Card.Body>
                    </Card>
         </Col>

        </Row>
        <div style={{marginTop:"30px"}}>  

       {/* { Object.keys(enteredData).map((key)=>{ 
        return  <div style={{marginTop:"15px"} }><li key={key}>
         <span style={{margin:"1px 3px 1px 1px",}}>{enteredData[key].amount}</span>
            <span style={{margin:"1px 3px 1px 10px"}}>{enteredData[key].disc}</span> 
            <span style={{margin:"1px 10px 1px 10px"}}>{enteredData[key].cate}</span>
             <span style={{margin:"6px 15px 1px 1px"}}> <Button size='sm' variant='success' onClick={()=>{onEditExpenseClickHandler(key)}}>Edit</Button></span>
            <span style={{margin:"6px 10px 1px 1px"}}><Button size='sm' variant='danger' onClick={()=>{onExpenseDeleteClickHandler(key)}}>Delete</Button> </span>
             </li>
            </div>
           
         
            })
        }  */}
        { Object.keys(enteredData).map((key)=>{ 
  return  <div style={{marginTop:"15px"} }><li key={key}>
   <span style={{margin:"1px 3px 1px 1px",}}>{enteredData[key].amount}</span>
      <span style={{margin:"1px 3px 1px 10px"}}>{enteredData[key].disc}</span> 
      <span style={{margin:"1px 10px 1px 10px"}}>{enteredData[key].cate}</span>
       <span style={{margin:"6px 15px 1px 1px"}}> <Button size='sm' variant='success' onClick={()=>{onEditExpenseClickHandler(key)}}>Edit</Button></span>
      <span style={{margin:"6px 10px 1px 1px"}}><Button size='sm' variant='danger' onClick={()=>{onDeleteClickHandler(key)}}>Delete</Button></span>
     </li></div>
})}

         {console.log(Object.values(enteredData))}
 
         </div>
    </>
  )
};
export default ExpenseForm;