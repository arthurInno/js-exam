import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { List, Avatar } from 'antd';
import { listRooms } from 'app/utils/room';
import { getRoomInfo } from 'app/actions/room';

import style from './JoinRoomPage.module.scss';

class JoinRoomPage extends React.Component {
  state = {
    roomList: [],
    isLoading: true
  };

  componentDidMount() {
    this.getRoomList();
  }

  getRoomList = async () => {
    const roomList = await listRooms();
    this.setState({ roomList, isLoading: false });
  };

  handleClickLink = roomId => {
    this.props.actions.getRoomInfo(roomId);
  }

  render() {
    const { roomList, isLoading } = this.state;
    return (
      <div className={style.listColumn}>
        <List
          itemLayout="horizontal"
          dataSource={roomList}
          loading={isLoading}
          renderItem={item => (
            <Link
              to={{
                pathname: `/admin/dispatch/${item.id}`
              }}
              onClick={() => this.handleClickLink(item.id)}
            >
              <List.Item style={{ borderBottom: '1px solid #ddd' }} className={style.listItem}>
                <List.Item.Meta
                  avatar={
                    <Avatar icon="home" className={style.avatar} />
                  }
                  title={
                    <>
                      <p>Room: {item.description}</p>
                    </>
                  }
                  description={item.status}
                />
              </List.Item>
            </Link>
          )}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    dispatch => {
      return {
        actions: {
          getRoomInfo: id => dispatch(getRoomInfo(id))
        }
      };
    }
  )(JoinRoomPage)
);