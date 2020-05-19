# Astria Backend Dev Note
Because TypeScript can complicate things, run the backend using this:

`pm2 start npm --name=asbdev -- run start`

### For Production
`pm2 start npm --name=asbprod -- run prod`

### For Remote Dev
`pm2 start npm --name=asbdev -- run dev`

#### Notes

We use a separate `models` folder to house all interfaces that will also be used as objects in the database.
