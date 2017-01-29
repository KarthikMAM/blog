class AdminController < ApplicationController

  def new

  end

  def create
    if log_in(params[:user], params[:password])
      flash.now[:success] = 'Login Successful'
      redirect_to admin_path
    else
      flash[:error] = [['Login Failed: ', 'User id / password mismatch']]
      redirect_to login_path
    end
  end

  def destroy
    log_out
    redirect_to login_path
  end

  def show
    unless logged_in?
      flash[:error] = [['Session:', 'Session not created']]
      redirect_to login_path
    end
  end
end
