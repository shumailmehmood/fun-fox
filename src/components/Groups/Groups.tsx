import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import Group from "../../models/Group";

interface GroupCardsProps {
  groups: Group[];
  getTasks: (groupId: number) => void;
}

const GroupCards: React.FC<GroupCardsProps> = ({ groups, getTasks }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      {groups.map((group) => (
        <Grid onClick={() => getTasks(group.id)} item key={group.id}>
          <Card style={{ margin: "10px", textAlign: "center" }}>
            <CardContent>
              <Typography variant="h4">{group.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GroupCards;
