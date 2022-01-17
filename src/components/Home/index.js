import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
// import {Link} from 'react-router-dom'
// import Loader from 'react-loader-spinner'
// import StateTable from '../StateTable'
// import CountryWideCasesCardGroup from '../CountryWideCasesCardGroup'
// import StateWiseHeader from '../StateWiseHeader'
import Header from '../Header'
import Footer from '../Footer'

import StateNameItem from '../StateNameItem'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {searchInput: '', countryData: {}}

  componentDidMount() {
    this.getCountryWiseData()
  }

  getFormattedExistingStatesList = () => {
    const formattedStates = statesList.map(each => ({
      stateName: each.state_name,
      stateCode: each.state_code,
    }))
    return formattedStates
  }

  getArray = data => {
    const list1 = []

    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0

        list1.push({
          stateCode: keyName,
          name: statesList.find(
            each => (each.state_code === keyName).state_name,
          ),

          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return list1
  }

  getCountryWiseData = async () => {
    const homeApiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'

    const response = await fetch(homeApiUrl)

    const data = await response.json()

    // console.log(data)

    const formattedArray = this.getArray(data, statesList)
    this.setState({countryData: formattedArray})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchedResultText = updatedStateList => {
    const {searchInput} = this.state

    const filteredStates = updatedStateList.filter(each =>
      each.stateName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return filteredStates
  }

  render() {
    const {searchInput, countryData} = this.state
    console.log(countryData)
    const updatedStateList = this.getFormattedExistingStatesList()

    const searchedResults = this.getSearchedResultText(updatedStateList)

    return (
      <div className="home-container">
        <Header />
        <div className="responsive-container">
          <div className="search-container">
            <BsSearch className="bs-search-icon" size={30} />
            <input
              tye="search"
              className="search-input"
              value={searchInput}
              placeholder="Enter the state"
              onChange={this.onChangeSearchInput}
            />
          </div>

          <ul className="state-wise-response-list">
            {searchedResults.map(each => (
              <StateNameItem key={each.stateCode} stateDetails={each} />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
