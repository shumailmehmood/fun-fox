interface Group {
  id: number;
  name: string;
  users: users[];
  usersDetail?: any[];
}
interface users {
    id: number

}
export default Group;
