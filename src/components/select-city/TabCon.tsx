import React, { Component } from 'react';

import classSet from './util/classSet';

// import address from './address';
// import { parseAddress } from './util/util';
// let addressMap = parseAddress(address);


// console.log(addressMap)

interface TabConProps {
    index: number;
    selectVal: any;
    params: any;
    addressMap: any;
    valIndex: number;
    changeState: (data) => void;
}
class TabCon extends Component<TabConProps, {}> {
    constructor(props) {
        super(props);
        // this.displayName = 'TabCon';
    }
    getItems() {
        let { index, selectVal, valIndex, params, addressMap } = this.props;

        /**
         * [max 最大联动的层级]
         */
        let deepMap = params.deepMap;
        let max = deepMap.length;

        /* index不能大于max */
        if (index >= max) {
            index = max - 1;
            valIndex = max - 2;
        }



        let id = selectVal[valIndex];
        let data = addressMap[index];

        let activeId = selectVal[index]


        let globalkey = 0;

        let cityItem = val => {
            let items: JSX.Element[] = [];
            for (let key in val) {
                let active = false;
                let id = parseInt(key, 10);
                if (activeId === id) {
                    active = true;
                }
                items.push(
                    <CityItem key={++globalkey} id={id} val={val} active={active} {...this.props} />
                )
            }
            return items;
        }


        if (!data) {
            return
        } else {
            /* 如果是第一级不同的处理 */
            if (index === 0) {
                let tempData = {};
                for (let val of data.values()) {
                    for (let key in val) {
                        tempData[key] = val[key]
                    }
                }
                data = tempData;
            }
            else {
                data = data.get(id);
            }

            /* 城市容器 */
            let items: JSX.Element[] = [];
            for (let key in data) {
                items.push(
                    <div className="area-item-group" key={++globalkey}>
                        {
                            (key !== '' && key !== 'null' && key !== 'undefined') && <span className="area-item">{key}</span>
                        }
                        <div className="city-item-group">
                            {cityItem(data[key])}
                        </div>
                    </div>
                )
            }

            return (
                <div className="citys-wrap">
                    {items}
                </div>
            )
        }




    }
    render() {
        let { index, changeState } = this.props;
        let items = this.getItems()
        return (
            <div >
                {items}
            </div>
        )
    }
}

interface CityItemProps {
    index: number;
    changeState: (data) => void;
    id: any;
    selectVal: any;
    selectName?: any;
    valIndex: any;
    val: any;
    active: any;
}
class CityItem extends Component<CityItemProps, {}> {
    constructor(props) {
        super(props);
        // this.displayName = 'CityItem';
    }
    handleClick(e) {
        let { index, changeState, id, selectVal, selectName, valIndex } = this.props;

        /* 记录当前点击的索引，用来记录值得位置 */
        valIndex = index;

        /* 索引 + 1 */
        index++;



        /** 
         * 如果点击的是第一个tabCon中的city,
         * 就清空初始化为空数组[],
         * 否则就拷贝props的selectVal
         */
        selectVal = valIndex === 0 ? [] : selectVal.concat();


        /**
         * 记录选中的id 
         * 赋值对应的selectVal
         */
        selectVal[valIndex] = parseInt(id, 10);

        /* 更新state */
        changeState({
            index: index,
            valIndex: valIndex,
            selectVal: selectVal,
            trigger: true,
        });
    }
    render() {

        let { id, val, active, selectName } = this.props;
        let text = val[id];

        let className = classSet({
            'city-item': true,
            active: active
        });

        return (
            <span className={className} data-id={id} onClick={(e) => this.handleClick(e)}> {text} </span>
        )
    }
}

export default TabCon;