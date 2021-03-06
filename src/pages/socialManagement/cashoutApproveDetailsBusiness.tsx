import * as React from 'react';
import CashoutOrderDetails from '../../businessComponents/common/cashoutOrderDetails';

class CashoutApproveDetails extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    render() {
        const locationCode = this.props.location.query.code;
        const params = JSON.parse(sessionStorage.getItem('cashoutApproveDetailsBusiness')!);
        const orderCode = params ? params.orderCode : undefined;
        return (
            <CashoutOrderDetails role={1} orderCode={locationCode||orderCode} />
        )
    }
}
export default CashoutApproveDetails;



