import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography, Chip } from "@mui/material";
import Group from "../../models/Group";
import styles from "./Groups.module.css";
import axios from "axios";
import User from "../../models/User";

interface GroupCardsProps {
  groups: Group[];
  getTasks: (groupId: number) => void;
}

const GroupCards: React.FC<GroupCardsProps> = ({ groups, getTasks }) => {
  useEffect(() => {
    fetchUsersAgainstGroups();
  }, []);
  const handleUsername = (username: string) => {
    const maxLength = 10;
    return username.length > maxLength
      ? `${username.substring(0, maxLength)}...`
      : username;
  };
  const fetchUsersAgainstGroups = async () => {
    let res = await axios.get<User[]>(`http://localhost:5000/users`);
    for (let i of groups) {
      i.usersDetail = res.data.filter((row: any) => i.users.includes(row.id));
    }
  };

  return (
    <Grid container justifyContent="center">
      {groups.map((group) => (
        <Grid item key={group.id}>
          <Card className={styles.groupCard} onClick={() => getTasks(group.id)}>
            <CardContent>
              <Typography variant="h4">{group.name}</Typography>
              <div className={styles.userChips}>
                {group?.usersDetail?.map((user, index) => (
                  <Chip
                    key={index}
                    label={handleUsername(user?.username)}
                    color="primary"
                    className={styles.usernameChip}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GroupCards;
