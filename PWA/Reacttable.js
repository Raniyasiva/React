import React from 'react';
import {Table,Thead,Tbody,Tr,Th,Td} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './style.css'
import img from '../src/images/download.jpg'

export default function Reacttable(){
    return(
        <div> 
             <h1>Table</h1>
        <Table className="table">  
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Role</Th>
                    <Th>Phone</Th>
                    <Th>Profile</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Raniya</Td>
                    <Td>Admin</Td>
                    <Td>099897894</Td>
                    
                   <Td>
                     {/* <img src="../images/download.jpg" alt='profile'/> */}
                     <img  src={img} alt='img' width={"60px"} height={"60px"}/>
                     </Td>
                </Tr>
                <Tr>
                    <Td>Sowmiya</Td>
                    <Td>User</Td>
                    <Td>789897894</Td>
                </Tr>
                <Tr>
                    <Td>Jinisha</Td>
                    <Td>Support</Td>
                    <Td>89897894</Td>
                </Tr>
            </Tbody>
        </Table>
        </div>
    );
}