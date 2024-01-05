import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import './style.css';

const Gridtable = () => {



  return (
    <div className='control-pane'>
      <h1>Table View</h1>
      <div className='control-section'>
        <GridComponent spacing={5} height='350'>
          <ColumnsDirective>
            <ColumnDirective field='ID' headerText='ID' width='120' />
            <ColumnDirective field='FirstName' headerText='First Name' width='170' />
            <ColumnDirective field='LastName' headerText='Last Name' width='170' />
            <ColumnDirective field='Email' headerText='Email' width='190' />
            <ColumnDirective field='Phone' headerText='Phone' width='130' />
            <ColumnDirective field='Role' headerText='Role' width='150' />
            <ColumnDirective field='Gender' headerText='Gender' width='150' />
          </ColumnsDirective>
        </GridComponent>
      </div>
    </div>
  );
};

export default Gridtable;
