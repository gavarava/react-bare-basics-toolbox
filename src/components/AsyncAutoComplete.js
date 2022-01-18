import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'

function indexData(array) {
  let rawData = new Set(array)
  let indexedData = new Map()
  rawData.forEach(value => {
    let firstLetter = value.substring(0, 1);
    if (indexedData.has(firstLetter)) {
      indexedData.get(firstLetter).add(value)
    } else {
      indexedData.set(firstLetter, new Set([value]))
    }
  })
  return indexedData
}

export default function AsyncAutoComplete(props) {
  const data = props.data
  const index = indexData(data)
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [typedKeywordToSearch, setTypedKeywordToSearch] = React.useState('')
  const loading = open && options.length === 0

  React.useEffect(() => {
    console.log("typedKeywordToSearch::::" + typedKeywordToSearch)
    async function searchStringInArray() {
      console.log("INSIDE searchStringInArray::::" + typedKeywordToSearch)
      const array = data
      console.info("USING DATA SET OF LENGTH:::: " + array.length)
      return new Promise((resolve, reject) => {
        if (array === undefined || typedKeywordToSearch === undefined) {
          return reject("Invalid Arguments to searchStringInArray(). Set typedKeywordToSearch and pass an array in props.data")
        } else {

          let searchResultsSet = new Set()
          let dataSet = typedKeywordToSearch.length > 1 ? index.get(typedKeywordToSearch.substring(0, 1)) : new Set().add(typedKeywordToSearch)
          console.log("USING INDEXED DATA SET OF LENGTH:::: " + dataSet.size)
          console.log("INDEXED DATA:::: " + dataSet.join(' '))
          dataSet.forEach(item => {
            console.log("item ==> " + item)
            console.log("searchString ==> " + typedKeywordToSearch)
            if (item.toLowerCase().includes(typedKeywordToSearch)
                || item.includes(
                    typedKeywordToSearch)) {
              searchResultsSet.add(item)
            }
          })
          console.log("Resolving 2::::" + searchResultsSet.size + " --- "
              + searchResultsSet)
          return resolve(() => Array.from(searchResultsSet))
        }
      })
    }

    let active = true
    /* TODO Fix loading block when generating results
    if (!loading) {
      return undefined
    } */

    if ((typedKeywordToSearch === '' || typedKeywordToSearch === undefined)) {
      return
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
    })()

    return () => {
      active = false
    }
  }, [loading, typedKeywordToSearch, data])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
      <Autocomplete
          id="asynchronous-demo"
          filterOptions={(x) => x}
          sx={{width: 300}}
          open={open}
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
          }}
          onSelect={() => setTypedKeywordToSearch('')}
          onInput={(event) =>
              setTypedKeywordToSearch(event.target.value)}
          isOptionEqualToValue={(option, value) => option === value}
          getOptionLabel={(option) => option}
          options={options}
          loading={loading}
          renderInput={(params) => (
              <TextField
                  {...params}
                  label={props.label}
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
  )
}
