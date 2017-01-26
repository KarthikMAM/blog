class AdminController < ApplicationController
  include AdminHelper

  def new

  end

  def create
    if log_in(params[:user], params[:password])
      flash[:success] = 'Login Successful'
      redirect_to admin_path
    else
      flash[:error] = [['Login Failed: ', 'User id / password mismatch']]
      redirect_to login_path
    end
  end

  def destroy
    log_out
  end

  def show
    if logged_in?
      flash[:success] = 'Logged in'
    else
      flash[:error] = [['Session:', 'Session not created']]
      redirect_to login_path
    end
  end
end
