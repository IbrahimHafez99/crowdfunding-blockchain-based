import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import User from './models/userModel.js';
import Campaign from './models/campaignModel.js';
import connectDB from './config/db.js';
import Campagin from './models/campaignModel.js';
import Contribution from './models/contributionModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    // Add new campaign as approved
    const campaign = new Campaign({
      user: createdUsers[0]._id,
      name: createdUsers[0].name,
      title: 'Test Campagin',
      description:
        'Culpa aliquip est sint aliqua magna laboris eu quis duis tempor nisi occaecat.',
      image:
        'https://cdn4.buysellads.net/uu/1/81016/1609783186-authentic-260x200-variation-2.jpg',
      goal: 0.05,
      endAt: '2025-05-25T08:33:42.905+00:00',
      minPledge: 0,
      state: 'approved'
    });
    await campaign.save();

    console.log('✅ Data Imported!'.green);
    process.exit();
  } catch (error) {
    console.error(`🛑 Error! ${error.message.bold}`.red.inverse, error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Campagin.deleteMany();
    await Contribution.deleteMany();

    console.log('⭕ Data Destroyed!'.red);
    process.exit();
  } catch (error) {
    console.error(`🛑 Error! ${error.message.bold}`.red.inverse, error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
