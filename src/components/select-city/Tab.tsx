import * as React  from 'react';
import classSet from './util/classSet';
interface TabProps {

}
class Tab extends React.Component<TabProps, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="tab">
                <TabBtns {...this.props} />
            </div>
        )
    }
}


class TabBtns extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    render() {
        let { params, index } = this.props;


        /**
         * [max 最大联动的层级]
         */
        let deepMap = params.deepMap;
        let max = deepMap.length;

        /* index不能大于max */
        if (index >= max) {
            index--;
        }


        let btnList:React.ReactNode[] = [];
        deepMap.forEach((v, i) => {
            let active = i === index ? true : false
            btnList.push(<OneTabBtn active={active} dataKey={i} key={i} name={v.name} {...this.props} />)
        });


        return (
            <ul className="tab-btns">
                {btnList}
            </ul>
        )
    }

}

class OneTabBtn extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    handleClick(e) {
        /* 阻止冒泡 */
        e.nativeEvent.stopImmediatePropagation();
        let { dataKey, changeState } = this.props;
        changeState({
            index: dataKey,
            valIndex: --dataKey
        });
    }
    render() {
        let {
            name,
            active,
            selectName,
            params,
            dataKey,
        } = this.props;
        if (selectName[dataKey]) {
            // if(dataKey === 2) {
            //     name = `${selectName[dataKey]}`;
            // }
            // else {
            //     name = `${selectName[dataKey]}${name}`;
            // }
            name = `${selectName[dataKey]}`;
        }
        let className = classSet({
            'tab-btn': true,
            'active': active,
        });
        return (
            <li onClick={e => this.handleClick(e)} className={className}>{name}</li>
        )
    }
}

export default Tab;