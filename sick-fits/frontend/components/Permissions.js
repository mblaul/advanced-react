import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { queryState } from '../lib/queryHelper';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import PropTypes from 'prop-types';

const possiblePermissions = [ 'ADMIN', 'USER', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE' ];

const ALL_USER_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const Permissions = (props) => {
  return (
    <Query query={ALL_USER_QUERY}>
      {({ data, error, loading }) => (
        <div>
          {queryState({ error, loading })}
          <div>
            <h2>Manage Permissions</h2>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {possiblePermissions.map((permission) => <th key={permission}>{permission}</th>)}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{data.users.map((user) => <UserPermissions key={user.id} user={user} />)}</tbody>
            </Table>
          </div>
        </div>
      )}
    </Query>
  );
};

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  };

  state = {
    permissions: this.props.user.permissions,
  };

  handlePermissionChange = (e) => {
    const checkbox = e.target;
    // Take a copy of current permissions
    let updatedPermissions = [ ...this.state.permissions ];
    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter((permission) => permission !== checkbox.value);
    }
    console.log(updatedPermissions);
    this.setState({ permissions: updatedPermissions });
  };

  render() {
    const { user } = this.props;
    return (
      <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{ permissions: this.state.permissions, userId: this.props.user.id }}>
        {(updatePermissions, { loading, error }) => (
          <>
          { queryState({ error, loading }) }
          <tr>
            <th>{user.name}</th>
            <th>{user.email}</th>
            {possiblePermissions.map((permission) => (
              <td key={permission}>
                <label htmlFor={`${user.id}-permission-${permission}`}>
                  <input
                    id={`${user.id}-permission-${permission}`}
                    type="checkbox"
                    checked={this.state.permissions.includes(permission)}
                    value={permission}
                    onChange={this.handlePermissionChange}
                  />
                </label>
              </td>
            ))}
            <td>
              <SickButton type="button" disabled={loading} onClick={updatePermissions}>
                  Updat{loading ? 'ing' : 'e'}
              </SickButton>
            </td>
          </tr>
          </>
        )}
      </Mutation>
    );
  }
}

export default Permissions;
