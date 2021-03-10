import React from 'react'
import {Grid} from "antd-mobile";
import {PropTypes} from 'prop-types';

export default class ImageSelector extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        selected: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedImage: this.props.selected
        }
    }

    selectImage(ele) {
        this.setState({
            selectedImage: ele
        })
    }

    render() {
        let selectedImage = this.state.selectedImage;
        return <div>
            {selectedImage.text}:{selectedImage ?
            <img src={selectedImage.icon} alt={selectedImage.text} width="40px"/> : null}
            <Grid data={this.props.data} columnNum="4"
                  onClick={(ele) => this.selectImage(ele)} selected={this.props.selected}/>
        </div>
    }

}