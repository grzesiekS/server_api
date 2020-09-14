import { connect } from 'react-redux';
import { getSeats, getRequests, loadSeatsRequest, loadSeats, getCountSeats } from '../../../redux/seatsRedux';
import SeatChooser from './SeatChooser';

const mapStateToProps = (state, props) => ({
  seats: getSeats(state),
  requests: getRequests(state),
  countSeats: getCountSeats(state, props.chosenDay),

});

const mapDispatchToProps = dispatch => ({
  loadSeats: () => dispatch(loadSeatsRequest()),
  loadSeatsData: seats => dispatch(loadSeats(seats)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SeatChooser);