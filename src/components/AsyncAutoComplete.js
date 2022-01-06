import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export default function AsyncAutoComplete(props) {
  const data = props.data;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [typedKeywordToSearch, setTypedKeywordToSearch] = React.useState('');
  const loading = open && options.length === 0;

  React.useEffect(() => {
    console.log("typedKeywordToSearch::::" + typedKeywordToSearch)

    async function searchStringInArray() {
      console.log("INSIDE searchStringInArray::::" + typedKeywordToSearch)
      const array = data;
      console.log("USING DATA SET OF LENGTH:::: " + array.length)
      return new Promise((resolve, reject) => {
        if (array === undefined || typedKeywordToSearch === undefined) {
          console.error("Rejecting")
          return reject("Invalid Arguments to searchStringInArray()")
        }
        if (array.find(element => element === typedKeywordToSearch)
            || array.find(
                element => element === typedKeywordToSearch.toLowerCase)) {
          console.log("Resolving 1")
          return resolve([typedKeywordToSearch])
        } else {
          let searchResultsArray = [];
          array.forEach(item => {
            console.log("item ==> " + item)
            console.log("searchString ==> " + typedKeywordToSearch)
            if (item.toLowerCase().includes(typedKeywordToSearch)
                || item.includes(
                    typedKeywordToSearch)) {
              searchResultsArray.push(item)
            }
          })
          console.log("Resolving 2::::" + searchResultsArray.length + " --- "
              + searchResultsArray)
          return resolve(searchResultsArray)
        }
      });
    }
    let active = true;
    /* TODO Fix loading block when generating results
    if (!loading) {
      return undefined;
    } */

    if((typedKeywordToSearch === '' || typedKeywordToSearch === undefined)) {
      return;
    }

    (async () => {
      // Async Await to search large dataset without freezing window
      await searchStringInArray()
      .then(value => {
        console.log("value inside promise:::: " + value)
        if (active) {
          setOptions(value)
        }
      })
      .catch(reason => console.error(reason))
      .finally(() => console.log("FINALLY"))
    })();

    return () => {
      active = false;
    };
  }, [loading, typedKeywordToSearch, data]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
      <Autocomplete
          id="asynchronous-demo"
          filterOptions={(x) => x}
          sx={{width: 300}}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onInput={(event) =>
              setTypedKeywordToSearch(event.target.value)}
          isOptionEqualToValue={(option, value) => option === value}
          getOptionLabel={(option) => option}
          options={options}
          loading={loading}
          renderInput={(params) => (
              <TextField
                  {...params}
                  label="Autocomplete Names"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <React.Fragment>
                          {loading ? <CircularProgress color="inherit"
                                                       size={20}/> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                    ),
                  }}
              />
          )}
      />
  );
}
