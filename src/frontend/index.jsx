import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Textfield, Select } from '@forge/react';
import { invoke, view } from '@forge/bridge';

const Tag = "macro-config-example: ";

function log(message) {
  console.log(Tag + message);
}

const mockCouncilMembers = [
  { label: "John Perry",   value: "1" },
  { label: "Harry Wilson", value: "2" },
  { label: "Jane Sagan",   value: "3" },
];

function getCouncilMembers(city) {
  /*
   * In a real application this would make an api call to fetch council members for
   * a given city.
   */
  if (city == "") {
    log("No city no council");
    return [];
  } else {
    log("City council for: " + city);
    return mockCouncilMembers;
  }
}

/*
 * React passes the parameter as an object.  If you call this as foo={bar}, 
 * then here, without {} you reference bar as city.foo.  The {} destructures the object
 * so you can reference bar as simply city.
 */
function CouncilMembers({city}) {

  const [councilMembers, setCouncilMembers] = useState([]);

  useEffect(() => {
    var cm = getCouncilMembers(city);
    setCouncilMembers(cm);
  }, [city]);

  if (city != "") {
    log(city + " council members: " + JSON.stringify(councilMembers));
  }

  return (
    <>
    { <Select 
          isMulti
          inputId="selected-councilpeople"
          placeholder="Select desired council members..."
          name="council"
          label="Council Members"
          options={councilMembers}/> }
    </>
  )
}

const Config = () => {
  const [city, setCity] = useState("");

  useEffect(() => {
    view.getContext().then((ctx) => {
        if (ctx?.extension.config?.city != undefined) {
          setCity(ctx.extension.config.city);
        }
    })
  }, []);

  log("City: " + city);
  return (
    <>
    <Textfield name="city" label="City" />
    <CouncilMembers city={city}/> 
    </>
  );
};

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  return (
    <>
      <Text>Hello world!</Text>
      <Text>{data ? data : 'Loading...'}</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
ForgeReconciler.addConfig(<Config />);