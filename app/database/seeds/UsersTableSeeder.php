<?php

class UsersTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('users')->truncate();
        User::create([
            'email'=>'sonnylazuardi@gmail.com',
            'password'=>Hash::make('administrator')
        ]);
	}

}
