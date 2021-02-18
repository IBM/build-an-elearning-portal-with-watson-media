import React from 'react'
class DynamicDropdownOptions extends React.Component {

    render(){
        const arr = this.props.arr;
        const optionItems = arr.map( item =>{
            return(
                {
                    id: item.id,
                    text: item.text
                }
            )
        })
        return(optionItems)
    }
}

export default DynamicDropdownOptions