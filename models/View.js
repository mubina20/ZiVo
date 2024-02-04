const MemberModel = require('../schema/member.model');
const ViewModel = require('../schema/view.model');
const PostModel = require('../schema/post.model');

class View {
	constructor(mb_id) {
		this.viewModel = ViewModel;
		this.memberModel = MemberModel;
		this.postModel = PostModel;
		this.mb_id = mb_id;
	}

	async validateChosenTarget(view_ref_id, group_type) {
		try {
			let result;
			switch (group_type) { 
				case 'member':
					result = await this.memberModel
						.findOne({
							_id: view_ref_id,
							mb_status: 'ACTIVE',
						})
						.exec();
					break;

				case 'post':
					result = await this.postModel
						.findOne({
							_id: view_ref_id,
							post_status: 'active',
						})
						.exec();
					break;
			}

			return !!result;
		} catch (err) {
			throw err;
		}
	}

	async insertMemberView(view_ref_id, group_type) {
		try {
			const new_view = new this.viewModel({
				mb_id: this.mb_id,
				view_ref_id: view_ref_id,
				view_group: group_type
			});
			const result = await new_view.save();

			// Target items view sonini bittaga oshiramiz
			await this.modifyItemViewCounts(view_ref_id, group_type);

			return result;
		} catch (err) {
			throw err;
		}
	}

	async modifyItemViewCounts(view_ref_id, group_type) {
		try {
			switch (group_type) {
				case 'member':
					await this.memberModel
						.findByIdAndUpdate(
							{
								_id: view_ref_id,
							},
							{
								$inc: { mb_views: 1 } 
							}
						)
						.exec();
					break;

				case 'post':
					await this.postModel
						.findByIdAndUpdate(
							{
								_id: view_ref_id,
							},
							{
								$inc: { post_views: 1 } 
							}
						)
						.exec();
					break;
			}

			return true;
		} catch (err) {
			throw err;
		}
	}

    async checkViewExistence(view_ref_id) {
        try {
            const view = await this.viewModel
                .findOne({
                    mb_id: this.mb_id,
                    view_ref_id: view_ref_id,
                })
                .exec();

            return view ? true : false;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = View;