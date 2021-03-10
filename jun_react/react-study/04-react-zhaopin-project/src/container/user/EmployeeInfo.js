import React from 'react'
import {InputItem, TextareaItem} from "antd-mobile";
import ImageSelector from '../../component/imgselector/image-selector'

export default class EmployeeInfo extends React.Component {
    handleChange(k, v) {
        console.log(k, v)
        return this.setState({
            [k]: v
        });
    }

    render() {
        const data = Array.from(new Array(8))
            .map((_val, i) => ({
                icon: 'http://www.itmuch.com/icons/wx.jpg',
                text: `name${i}`,
            }));
        return (
            <div>
                <ImageSelector data={data} selected={data[0]}/>
                <InputItem placeholder="公司名称"
                           onChange={(v) => this.handleChange('companyId', v)}>
                    公司名称
                </InputItem>
                <InputItem placeholder="招聘岗位"
                           onChange={(v) => this.handleChange('job', v)}>
                    招聘岗位
                </InputItem>
                <InputItem placeholder="公司名称"
                           onChange={(v) => this.handleChange('salary', v)}>
                    薪资范围
                </InputItem>
                <TextareaItem title="岗位描述" placeholder="岗位描述" autoHeight
                              onChange={(v) => this.handleChange('description', v)}
                />
            </div>
        )
    }
}