import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Grid,
  makeStyles,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Avatar,
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import Label from 'src/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {},
  name: {
    marginTop: theme.spacing(1),
  },
  avatar: {
    height: 200,
    width: 200,
  },
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  spaceTop: {
    marginTop: 15,
  },
}));

const General = ({ className, ...rest }) => {
  const classes = useStyles();
  const { user } = useAuth();
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title='Profile' />
      <Divider />
      <CardContent>
        <Grid
          className={clsx(classes.root, className)}
          container
          spacing={3}
          {...rest}
        >
          <Grid item xl={3} md={6} xs={12}>
            <Box
              display='flex'
              alignItems='center'
              flexDirection='column'
              textAlign='center'
            >
              <Avatar
                className={classes.avatar}
                src={'/static/images/avatars/avatar_4.png'}
              />
              <Typography
                className={classes.name}
                color='textPrimary'
                gutterBottom
                variant='h3'
              >
                {user.userFirstName} {user.userLastName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xl={3} md={6} xs={12}>
            <Card className={clsx(classes.root, className)} {...rest}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Email
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color='textSecondary'>
                        {user.email}
                      </Typography>
                      {user.email ? (
                        <Label color='success'>Email verified</Label>
                      ) : null}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Phone
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color='textSecondary'>
                        {user.userPhoneNumber}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Country
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color='textSecondary'>
                        {user.country || null}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      State/Region
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color='textSecondary'>
                        {user.state || null}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Address
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color='textSecondary'>
                        {user.address || null}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

General.propTypes = {
  className: PropTypes.string,
};

export default General;
