import React, { useState } from 'react'

export default function NpmsAPI() {
    const [packageName, setPackageName] = useState('');
    const [packageInfo, setPackageInfo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleFormSubmit(e) {
        e.preventDefault();
    
        try {
          const response = await fetch(`https://api.npms.io/v2/package/${packageName}`);
          const data = await response.json();
    
          if (data.code === 'NOT_FOUND') {
            setPackageInfo(null);
            setErrorMessage(`Le package ${packageName} n'a pas été trouvé.`);
          } else {
            setPackageInfo({
              description: data.collected.metadata.description,
              latestVersion: data.collected.metadata.version,
              githubStars: data.collected.github.starsCount
            });
            setErrorMessage('');
          }
        } catch (error) {
          console.error(error);
          setPackageInfo(null);
          setErrorMessage(`Une erreur s'est produite : ${error.message}`);
        }
      }

      function handlePackageNameChange(e) {
        setPackageName(e.target.value);
      }    


  return (
    <>
    <div>
    <div className="text-white text-2xl text-center uppercase pt-8">
      <h1>Rechercher une package npm : </h1>
    </div>
    <form onSubmit={handleFormSubmit} className="items-center mx-auto max-w-3xl py-30 sm:py-16 lg:py-50"> 
     
    <div className="flex items-center">
    <label for="voice-search" className="sr-only">Search</label>
        <div className="relative w-full">
            <input type="text"
            value={packageName}
            onChange={handlePackageNameChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            />
            <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
            </button>
        </div>
        <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Rechercher
        </button>
    </div>
    </form>
    <div className="mx-auto max-w-3xl py-30 sm:py-16 lg:py-50">
    {packageInfo && (
        <div classname="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Package name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Latest version
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Start in Github
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" 
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {packageName}
                    </th>
                    <td className="px-6 py-10">
                        {packageInfo.description}
                    </td>
                    <td className="px-6 py-4">
                        {packageInfo.latestVersion}
                    </td>
                    <td className="flex items-center gap-2 px-6 py-12">
                        {packageInfo.githubStars}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-gray-900 dark:text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </td>
                    
                </tr>
            </tbody>
        </table>
        </div>
      )}

      {errorMessage && <p className="text-gray-200">{errorMessage}</p>}




    </div>
    
    </div>

    
    </>
    

  )
}
